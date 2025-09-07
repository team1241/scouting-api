import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono({ strict: false, defaultHook });
}

export default function createApp() {
  // const app = createRouter();
  const app = new Hono();
  app.use(serveEmojiFavicon("📊"));
  app.use(requestId());
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
