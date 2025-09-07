import { Hono } from "hono";
import app from "./app.js";

const baseApp = new Hono();

baseApp.route("/", app);

export default baseApp;
