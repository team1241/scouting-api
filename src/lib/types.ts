import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type ScoutingAppRouteHandler<R extends RouteConfig> = RouteHandler<R>;
