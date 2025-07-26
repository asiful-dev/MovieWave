import AsyncHandler from "../utils/AsyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import Booking from "../models/booking.models.js"
import Show from "../models/show.models.js"
import User from "../models/user.models.js"
import ApiError from "../utils/ApiError.js"





const isAdmin = AsyncHandler(async (_, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "The User is Admin!",
                {
                    isAdmin: true
                }
            )
        )
})

const getDashBoardData = AsyncHandler(async (req, res) => {
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
            new ApiResponse(
                200,
                "Dashboard Data Fetched Successfully!",
                dashBoardData
            )
        )
})

const getAllBookings = AsyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate("user")
        .populate({
            path: "show",
            populate: {
                path: "movie"
            }
        })
        .sort({ createdAt: -1 })

    if (!bookings) {
        throw new ApiError(404, "No bookings found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "All bookings fetched successfully!",
                bookings
            )
        );
})


const getAllShows = AsyncHandler(async (req, res) => {
    const shows = await Show.find({});
    if (!shows) throw new ApiError(404, "No Shows Found!");
    console.log(shows);
    
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "All Shows Fetched Successfully!",
                shows
            )
        )
})

export {
    isAdmin,
    getDashBoardData,
    getAllBookings,
    getAllShows
}