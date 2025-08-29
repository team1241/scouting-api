import { unkey } from "@unkey/hono";
import env from "./env.js";
import configureOpenAPI from "./lib/configure-openapi.js";

import createApp from "./lib/create-app.js";
import images from "./routes/v1/images/images.index.js";
import scouts from "./routes/v1/scouts/scouts.index.js";
import seasons from "./routes/v1/seasons/seasons.index.js";

const app = createApp();

configureOpenAPI(app);

app.use("*", unkey({
  rootKey: env.UNKEY_ROOT_KEY,
  getKey: (c) => {
    const apiKey = c.req.header("x-rhr-scouting-api-key");
    if (!apiKey) {
      return c.text("API key missing", 401);
    }
    return apiKey;
  },
  onError: (c) => {
    return c.text("Unauthorized", 401);
  },
  handleInvalidKey: (c, result) => {
    return c.json(
      {
        error: "Unauthorized",
        reason: result.data.code,
      },
      401,
    );
  },
}));

const v1Routers = [seasons, scouts, images];

v1Routers.forEach((route) => {
  app.route("/v1", route);
});

export default app;
