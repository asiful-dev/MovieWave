import apiError from "./apiError.js";
import { apiGet } from "./axiosUtility.js";
import { Movie } from "../models/movie.models.js"


const createMovieFromTMDB = async (movieId) => {
    try {
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all(
            apiGet(`/movie/${movieId}`),
            apiGet(`/movie/${movieId}/credits`)
        );

        const movieApiData = movieDetailsResponse.data;
        const movieCreditsData = movieCreditsResponse.data;

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

        const movie = await Movie.create(movieDetails);
        return movie;

    } catch (error) {
        console.log(error.statusCode, " ", error.message)
        throw new apiError(500, "Failed to fetch movie from TMDB!")
    }
}

export default createMovieFromTMDB;