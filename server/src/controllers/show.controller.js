import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { apiGet } from "../utils/axiosUtility.js"

const getNowPlayingMovies = asyncHandler(async (_, res) => {
    const data = await apiGet("/movie/now_playing")
    const movies = data?.results;
    if (!movies || !Array.isArray(movies)) throw new apiError(500, "Internal Server Error! Failed Fetch Now Playing Movies");

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Now playing movies successfully fetched!",
                movies
            )
        )
})

const getUpcomingMovies = asyncHandler(async (_, res) => {
    const data = await apiGet("/movie/upcoming")

    const movies = data?.results;
    if (!movies || !Array.isArray(movies)) throw new apiError(500, "Internal Server Error! Failed Fetch Upcoming Movies");

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Upcoming movies successfully fetched!",
                movies
            )
        )

})



export {
    getNowPlayingMovies,
    getUpcomingMovies
}