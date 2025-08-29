import type { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: OpenAPIHono) {
  app.doc("/api-doc", {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "RHR Scouting API",
    },
  });

  app.get("/api-reference", Scalar({
    url: "/api-doc",
    theme: "bluePlanet",
    layout: "classic",
    pageTitle: "RHR Scouting API Reference",
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch",
    },
  }));
}
