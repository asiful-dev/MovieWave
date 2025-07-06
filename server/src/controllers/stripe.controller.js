import stripe from "stripe";
import { Booking } from "../models/booking.models";
import { inngest } from "../inngest/index.js"
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";

const stripeWebHooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];
    let event;
    try {
        event=stripeInstance.webhooks.constructEvent(req.body,signature,process.env.STRIPE_WEBHOOK_SECRET)

    } catch (error) {
        throw new apiError(400, `Webhook Error ${error.message}`)
    }
}