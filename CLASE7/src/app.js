import express from "express";
import serviceRouter from "./routers/services.router.js"

import configureHandlebars from "./config/handlebars.js";
import path from "path"
import { fileURLToPath } from "url";
import viewRouter from "./routers/view.router.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json());
app.use("/api/services", serviceRouter)
app.use("/", viewRouter)

app.use(express.static(path.join(__dirname, "./public")))

configureHandlebars(app, __dirname)

export default app