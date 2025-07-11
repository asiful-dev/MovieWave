import express from "express"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'


const app = express();


//middlewares
app.use(clerkMiddleware())

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


app.get('/', (req, res) => {
    res.status(200).send('Your app is live.');
});


import { serve } from "inngest/express";
import { inngest, functions } from "./Inngest/inngest.js"

app.use("/api/inngest", serve({ client: inngest, functions }));




export { app }