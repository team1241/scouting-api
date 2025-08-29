import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../env.js";
import * as relations from "./relations.js";
import * as schema from "./schema.js";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DEV_DATABASE_URL ?? env.DATABASE_URL, { prepare: false });
const db = drizzle({ client, schema: { ...schema, ...relations } });

export default db;
