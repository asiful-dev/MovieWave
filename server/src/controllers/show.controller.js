import AsyncHandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { apiGet } from "../utils/AxiosHelper.js"

const getNowPlayingMovies = AsyncHandler(async (_, res) => {
    const data = await apiGet("/movie/now_playing");

    if (!data) throw new ApiError(500, "Failed to fetch now playing movies");

    const movies = data.results;
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Successfully fetched now-playing movies for TMDB",
                movies
            )
        )
});

const getUpcomingMovies = AsyncHandler(async (_, res) => {
    const data = await apiGet("/movie/upcoming");

    if (!data) throw new ApiError(500, "Failed to fetch upcoming movies");

    const movies = data.results;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Successfully fetched upcoming movies for TMDB",
                movies
            )
        )
});



export {
    getNowPlayingMovies,
    getUpcomingMovies
}

