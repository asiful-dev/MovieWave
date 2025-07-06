import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import Booking from "../models/booking.models.js"
import Show from "../models/show.models.js"
import User from "../models/user.models.js"

const isAdmin = asyncHandler(async (_, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "The user is admin!",
                {
                    isAdmin: true
                }
            )
        )
});

const getDashBoardData = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({
        isPaid: true
    });

    const activeShows = await Show.find({
        showDateTime: {
            $gte: new Date()
        }
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const totalBookings = Array.isArray(bookings) ? bookings.length : 0;

    const totalRevenue = Array.isArray(bookings) ? bookings.reduce((acc, booking) => acc + (booking.amount || 0), 0) : 0;

    const dashBoardData = {
        totalBookings,
        totalRevenue,
        activeShows: Array.isArray(activeShows) ? activeShows : [],
        totalUser: typeof totalUser === "number" ? totalUser : 0
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Dashboard Data Fetched Successfully!",
                dashBoardData
            )
        )


})


const getAllShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({
        showDateTime: {
            $gte: new Date()
        }
    }).populate("movie").sort({ showDateTime: 1 });

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Successfully Fetched All Shows!",
                shows
            )
        )
})

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate("user")
        .populate({
            path: "show",
            populate: {
                path: "movie"
            }
        })
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Successfully Fetched All Bookings",
                bookings
            )
        )
})

export {
    isAdmin,
    getDashBoardData,
    getAllShows,
    getAllBookings
}

