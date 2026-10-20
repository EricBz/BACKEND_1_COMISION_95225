import express from "express";
import serviceRouter from "./routers/services.router.js"

const app = express()

app.use(express.json());
app.use("/api/services", serviceRouter)


export default app