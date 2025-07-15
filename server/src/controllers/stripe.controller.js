import stripe from "stripe"
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Booking from "../models/booking.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { inngest } from "../Inngest/inngest.js";


const stripeWebHooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        console.error(`Webhook Error: ${error.message}`);
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })
                const session = sessionList.data[0];
                const { bookingId } = session.metadata;

                await Booking.findByIdAndUpdate(
                    bookingId,
                    {
                        isPaid: true,
                        paymentLink: ""
                    },
                    { new: true }
                )

                await inngest.send({
                    name: "app/show.booked",
                    data: {
                        bookingId
                    }
                })

                break;
            }

            default:
                console.log("Unhandled Event Type ", event.type);

        }

        res.json({ received: true })

    } catch (error) {
        console.error("Webhook Processing Error ", error);
        res.status(500).send("Internal Server Error")

    }
}

export default stripeWebHooks;
