import configureOpenAPI from "./lib/configure-openapi.js";
import createApp from "./lib/create-app.js";

import images from "./routes/v1/images/images.index.js"
import scouts from "./routes/v1/scouts/scouts.index.js"
import seasons from "./routes/v1/seasons/seasons.index.js"


const app = createApp();

configureOpenAPI(app)

const v1Routers = [seasons, scouts, images];

v1Routers.forEach((route) => {
  app.route("/v1", route);
});

export default app;