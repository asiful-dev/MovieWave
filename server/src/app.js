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

/* 
inngest test endpoint

app.get("/api/hello", async function (req, res, next) {
    await inngest.send({
        name: "test/hello.world",
        data: {
            email: "testUser@example.com",
        },
    }).catch(err => next(err));
    res.json({ message: 'Event sent!' });
}); */


export { app }