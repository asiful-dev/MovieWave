import { Router } from "express"
import {
    addShow,
    deleteShow,
    getAllShows,
    getNowPlayingMovies,
    getSingleShow,
    getTrailer,
    getUpcomingMovies,
    listShows
} from "../controllers/show.controller.js";
import protectAdmin from "../middlewares/auth.middleware.js";

const showRouter = Router();

showRouter.route("/now-playing").get(getNowPlayingMovies);
showRouter.route("/upcoming").get(getUpcomingMovies)
showRouter.route("/list-shows").get(listShows);
showRouter.route("/add").post(addShow)
showRouter.route("/all").get(getAllShows)
showRouter.route("/:movieId").get(getSingleShow)
showRouter.route("/:movieId/trailer").get(getTrailer)
showRouter.route("/delete").delete(protectAdmin, deleteShow)



export default showRouter;