import { Router } from "express"
import { addShow, getAllShows, getNowPlayingMovies, getSingleShow, getUpcomingMovies } from "../controllers/show.controller.js";
import protectAdmin from "../middlewares/auth.middleware.js";

const showRouter = Router();

showRouter.route("/now-playing").get(getNowPlayingMovies);
showRouter.route("/upcoming").get(getUpcomingMovies)
showRouter.route("/add").post(addShow)
showRouter.route("/all").get(getAllShows)
showRouter.route("/:movieId").get(getSingleShow)


export default showRouter;