import type { OpenAPIHono } from "@hono/zod-openapi";
import { unkey } from "@unkey/hono";
import env from "../env.js";

export default function configureUnkey(app: OpenAPIHono) {
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
}
