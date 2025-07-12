import { Router } from "express";
import { getAllMovies, getSingleMovie } from "../controllers/movie.controller.js";

const movieRouter=Router();

movieRouter.route("/all").get(getAllMovies);
movieRouter.route("/:movieId").get(getSingleMovie)

export default movieRouter;