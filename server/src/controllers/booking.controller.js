import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Show from "../models/show.models.js";
import Booking from "../models/booking.models.js";
import stripe from "stripe"

const checkSeatAvailability = async (showId, selectedSeats) => {
    try {
        const show = await Show.findById(showId);
        if (!show) throw new ApiError(404, "Show not found");
        const occupiedSeats = show.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;

    } catch (error) {
        throw new ApiError(500, "Error checking seat availability")
    }
}


const createBooking = AsyncHandler(async (req, res) => {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);

    if (!isAvailable) throw new ApiError(400, "Selected Seats Are Not Available!");

    const show = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
        user: userId,
        show: showId,
        amount: show.showPrice * selectedSeats.length,
        bookedSeats: selectedSeats
    });

    selectedSeats.map(seat => show.occupiedSeats[seat] = userId);

    show.markModified("occupiedSeats");

    await show.save();

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [{
        price_data: {
            currency: "usd",
            product_data: {
                name: show.movie.title
            },
            unit_amount: Math.floor(booking.amount) * 100
        },
        quantity: 1
    }]

    const session = await stripeInstance.checkout.sessions.create({
        success_url: `${origin}/loading/my-bookings`,
        cancel_url: `${origin}/my-bookings`,
        line_items,
        mode: "payment",
        metadata: {
            bookingId: booking._id.toString()
        },
        expires_at: Math.floor(Date.now() / 1000 + 35 * 60)
    })

    booking.paymentLink = session?.url;
    await booking.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                "Booking Created Successfully!",
                {
                    url: session.url
                }
            )
        )
});


const getOccupiedSeats = AsyncHandler(async (req, res) => {
    const { showId } = req.params;
    const show = await Show.findById(showId);
    if (!show) throw new ApiError(404, "Show Not Found!");

    if (!show.occupiedSeats || typeof show.occupiedSeats !== "object") {
        throw new ApiError(500, "Occupied seats data is invalid");
    }

    const occupiedSeats = Object.keys(show.occupiedSeats);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Occupied Seats Fetched Successfully!",
                occupiedSeats
            )
        )
})

export {
    createBooking,
    getOccupiedSeats
}

