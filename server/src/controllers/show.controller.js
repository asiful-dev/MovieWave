import AsyncHandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { apiGet } from "../utils/AxiosHelper.js"
import Movie from "../models/movie.models.js"
import { inngest } from "../Inngest/inngest.js"
import Show from "../models/show.models.js"



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

const addShow = AsyncHandler(async (req, res) => {
    const { movieId, showsInput, showPrice } = req.body;
    if (!movieId || !showsInput || !showPrice) {
        throw new ApiError(400, "Missing required fields: movieId, showsInput, or showPrice");
    }

    let movie;
    try {
        movie = await Movie.findById(movieId);
    } catch (err) {
        throw new ApiError(500, "Error fetching movie from database");
    }

    if (!movie) {
        let movieDetailsResponse, movieCreditsResponse;
        try {
            movieDetailsResponse = await apiGet(`/movie/${movieId}`);
            movieCreditsResponse = await apiGet(`/movie/${movieId}/credits`);
        } catch (err) {
            throw new ApiError(500, "Failed to fetch movie details from TMDB");
        }

        const movieApiData = movieDetailsResponse;
        const movieCreditsData = movieCreditsResponse;



        const movieDetails = {
            _id: movieId,
            title: movieApiData.title,
            overview: movieApiData.overview,
            poster_path: movieApiData.poster_path,
            backdrop_path: movieApiData.backdrop_path,
            genres: movieApiData.genres,
            casts: movieCreditsData.cast,
            release_date: movieApiData.release_date,
            original_language: movieApiData.original_language,
            tagline: movieApiData.tagline || "",
            vote_average: movieApiData.vote_average,
            runtime: movieApiData.runtime
        };

        try {
            movie = await Movie.create(movieDetails);
        } catch (err) {
            throw new ApiError(500, "Failed to create movie in database");
        }
    }

    const showsToCreate = [];
    try {
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            });
        });
    } catch (err) {
        throw new ApiError(400, "Invalid showsInput format");
    }

    if (showsToCreate.length > 0) {
        try {
            await Show.insertMany(showsToCreate);
        } catch (err) {
            throw new ApiError(500, "Failed to add shows to database");
        }
    }

    try {
        await inngest.send({
            name: "app/show.added",
            data: {
                movieTitle: movie.title
            }
        });
    } catch (err) {
        throw new ApiError(500, "Failed to send event to inngest");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                "Show added successfully",
                showsToCreate
            )
        );
});

const deleteShow = AsyncHandler(async (req, res) => {
    const { showId } = req.body;
    const show = await Show.findById(showId);
    if (!show) throw new ApiError(404, "Show Not Found");
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Show Deleted Successfully!",
                show
            )
        )
})

const getAllShows = AsyncHandler(async (_, res) => {
    const shows = await Show.find({}).populate("movie").sort({ showDateTime: 1 });

    const uniqueShows = new Set(shows.map(show => show.movie));

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Shows Fetched Successfully",
                {
                    shows: Array.from(uniqueShows)
                }
            )
        )
})


const getSingleShow = AsyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const singleMovie = await Movie.findById(movieId);
    if (!singleMovie) {
        throw new ApiError(404, "Movie not found");
    }
    const shows = await Show.find({ movie: movieId });

    const dateTime = {};
    shows.forEach((show) => {
        const date = show.showDateTime.toISOString().split("T")[0];
        if (!dateTime[date]) dateTime[date] = [];
        dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Show fetched successfully",
                [
                    singleMovie,
                    dateTime
                ]
            )
        )
})

const listShows = AsyncHandler(async (req, res) => {
    const shows = await Show.find({
        occupiedSeats: { $ne: {} }
    })
        .populate("movie")
        .sort({ showDateTime: 1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Successfully fetched all shows!",
                shows
            )
        )
})

const getTrailer = AsyncHandler(async (req, res) => {
    const { movieId } = req.params
    const data = await apiGet(`/movie/${movieId}/videos`);
    if (!data) throw new ApiError(500, "Error fetching the movie trailers");
    const trailerResponse = data.results;

    const trailer = trailerResponse.find((video) => video.type === "Trailer" && video.official === true && video.site === "YouTube")


    const trailerLink = `https://www.youtube.com/watch?v=${trailer?.key}`
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Trailer is fetched successfully!",
                trailerLink
            )
        )

})
export {
    getNowPlayingMovies,
    getUpcomingMovies,
    addShow,
    getAllShows,
    getSingleShow,
    listShows,
    getTrailer,
    deleteShow
}

