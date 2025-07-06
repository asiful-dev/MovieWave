import express from "express"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"

const app = express();

app.use(clerkMiddleware());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));

app.get("/", (_, res) => {
    res.status(200).send("Server is live!!!!")
});

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/show.routes.js"

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/show", showRouter);

export { app }
