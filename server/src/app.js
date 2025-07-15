import express from "express"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'
import stripeWebHooks from "./controllers/stripe.controller.js"

const app = express();

app.use("/api/stripe",
    express.raw({
        type: "application/json"
    }),
    stripeWebHooks
)
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
import showRouter from "./routes/show.routes.js";
import adminRouter from "./routes/admin.routes.js";
import movieRouter from "./routes/movie.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import userRouter from "./routes/user.routes.js";







app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);
app.use("/api/show", showRouter);
app.use("/api/admin", adminRouter);
app.use("/api/movie", movieRouter);
app.use("/api/booking", bookingRouter);

export { app }