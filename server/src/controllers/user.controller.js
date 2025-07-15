import AsyncHandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Booking from "../models/booking.models.js"
import Movie from "../models/movie.models.js"
import { clerkClient } from "@clerk/express"


const getUserBookings = AsyncHandler(async (req, res) => {
    const { userId } = req.auth();
    const bookings = await Booking.find({ user: userId })
        .populate({
            path: "show",
            populate: {
                path: "movie"
            }
        })
        .sort({ createdAt: -1 })

    if (!bookings) throw new ApiError(404, "No Bookings Found For This User");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Bookings For This User Successfully Fetched!",
                bookings
            )
        )
})







export {
    getUserBookings,
}