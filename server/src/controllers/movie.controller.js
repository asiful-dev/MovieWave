import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Movie from "../models/movie.models.js";

const getAllMovies = AsyncHandler(async (_, res) => {
    const movies = await Movie.find({});
    if (!movies.length) throw new ApiError(400, "There are now movies in the Database");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "All Movies Fetched Successfully!",
                movies
            )
        )
});

const getSingleMovie = AsyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) throw new ApiError(404, "Movie not found");
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Movie Fetched Successfully",
                movie
            )
        )

})

export {
    getAllMovies,
    getSingleMovie
}