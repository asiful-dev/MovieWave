import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { apiGet } from "../utils/axiosUtility.js"
import { Movie } from "../models/movie.models.js"
import { Show } from "../models/show.models.js"
import createMovieFromTMDB from "../utils/createMovieFromTMDB.js"
import createShowsFromInput from "../utils/createShowsFromInput.js"
import { inngest } from "../inngest/index.js"

const getOrCreateMovie = async (movieId) => {
    let movie = await Movie.findById(movieId);

    if (!movie) movie = await createMovieFromTMDB(movieId);

    return movie;
}

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

const addShow = asyncHandler(async (req, res) => {

    //movieId,showsInput,showPrice
    const { movieId, showsInput, showPrice } = req.body;

    const movie = await getOrCreateMovie(movieId);

    const showsToCreate = createShowsFromInput(showsInput, movieId, showPrice);

    if (showsToCreate.length > 0) await Show.insertMany(showsToCreate);

    await inngest.send(
        {
            name: "app/show.added",
            data: {
                movieTitle: movie.title
            }
        }
    )

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                "Show added successfully",
                showsToCreate
            )
        )


})


const getAllShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({
        showDateTime: {
            $gte: new Date()
        }
    }).populate("movie").sort({ showDateTime: 1 });

    const uniqueMovieMap = new Map();

    shows.forEach(show => {
        const movieId = show.movie?._id?.toString();
        uniqueMovieMap.set(movieId, show.movie);
    })

    const uniqueShows = Array.from(uniqueMovieMap.values());

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Shows Fetched Successfully",
                {
                    shows: uniqueShows
                }
            )
        )


})

const getSingleShow = asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    const shows = await Show.find({
        movie: movieId,
        showDateTime: {
            $gte: new Date()
        }
    });

    const dateTime = {};

    shows.forEach((show) => {
        const date = show.showDateTime.toISOString().split("T")[0];
        // 2025-07-10T14:00:00Z eikhan theke 2025-07-10 (YYYY-MM-DD)
        if (!dateTime[date]) dateTime = [];
        dateTime[date].push({ time: show.showDateTime, showId: show._id })

    })

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Show Fetched Succssfully!",
                [
                    movie,
                    dateTime
                ]
            )
        )


})

export {
    getNowPlayingMovies,
    getUpcomingMovies,
    addShow,
    getAllShows,
    getSingleShow
}