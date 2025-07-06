import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";
import { Show } from "../models/show.models.js"
import stripe from "stripe"
import { Booking } from "../models/booking.models.js"
const checkSeatAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) return false;
        const occcupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occcupiedSeats[seat]);

        return !isAnySeatTaken;

    } catch (error) {
        throw new apiError(500, "Error checking seat availability")
    }
};


const createBooking = asyncHandler(async (req, res) => {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await checkSeatAvailability(showId, selectedSeats);

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
        user: userId,
        show: showId,
        amount: showData.showPrice * selectedSeats.length,
        bookedSeats: selectedSeats
    })

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [{
        price_data: {
            currency: "usd",
            product_data: {
                name: showData.movie.title
            },
            unit_amount: Math.floor(booking.amount) * 100
        },
        quantity: 1
    }]

    const session = await stripeInstance.checkout.sessions.create({
        success_url: "${origin}/loading/my-bookings",
        cancel_url: `${origin}/my-bookings`,
        line_items: line_items,
        mode: "payment",
        metadata: {
            bookingId: booking._id.toString()
        },
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60
    });



    booking.paymentLink = session.url;
    await booking.save();

    await inngest.send({
        name: "app/checkpayment",
        data: {
            bookingId: booking._id.toString()
        }
    })

    selectedSeats.forEach((seat) => {
        showData.occupiedSeats[seat] = userId;
    })
    await showData.save();

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                "Booking Created Successfully",
                {
                    url: session.url
                }
            )
        )
});

const getOccupiedSeats = asyncHandler(async (req, res) => {
    const { showId } = req.params;

    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Occupied Seats Fetched Successfully",
                occupiedSeats
            )
        )
})



export {
    checkSeatAvailability,
    createBooking,
    getOccupiedSeats
}