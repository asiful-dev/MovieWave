import stripe from "stripe"
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Booking from "../models/booking.models.js";
import ApiResponse from "../utils/ApiResponse.js";



const stripeWebHooks = AsyncHandler(async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRETF);


    } catch (error) {
        throw new ApiError(400, `Stripe Webhook Error: ${error.message}`)
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checked.sessions.list({
                    paymentIntent: paymentIntent.id
                })

                const session = sessionList.data[0];
                const { bookingId } = session.metadata;

                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentLink: ""
                })
            }
                break;

            default:
                console.log("Unhandled Event Type: ", event.type);

        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Webhook processed successfully",
                    {}
                )
            );
    } catch (error) {
        console.error("Webhook Processing Error ", error);
        throw new ApiError(500, "Stripe Interval Sever Error");

    }
})

export default stripeWebHooks;