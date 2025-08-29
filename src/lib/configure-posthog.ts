import type { OpenAPIHono } from "@hono/zod-openapi";
import { env as honoEnv } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { PostHog } from "posthog-node";
import env from "../env.js";

const posthogMiddleware = createMiddleware(async (c, next) => {
  const { POSTHOG_PUBLIC_KEY } = honoEnv<{ POSTHOG_PUBLIC_KEY: string }>(c);
  const posthog = new PostHog(POSTHOG_PUBLIC_KEY, { host: "https://us.i.posthog.com" });

  posthog.capture({
    distinctId: c.req.header("x-rhr-scouting-api-key") ?? "unknown",
    event: `${c.req.method} ${c.req.path}`,
    properties: {
      environment: env.NODE_ENV,
    },
  });

  await posthog.shutdown();
  await next();
});

export default function configurePosthog(app: OpenAPIHono) {
  app.use("*", posthogMiddleware);
}
