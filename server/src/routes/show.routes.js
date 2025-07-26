import { Router } from "express"
import {
    addShow,
    getAllShows,
    getNowPlayingMovies,
    getSingleShow,
    getTrailer,
    getUpcomingMovies,
    listShows
} from "../controllers/show.controller.js";

const showRouter = Router();

showRouter.route("/now-playing").get(getNowPlayingMovies);
showRouter.route("/upcoming").get(getUpcomingMovies)
showRouter.route("/list-shows").get(listShows);
showRouter.route("/add").post(addShow)
showRouter.route("/all").get(getAllShows)
showRouter.route("/:movieId").get(getSingleShow)
showRouter.route("/:movieId/trailer").get(getTrailer)



export default showRouter;