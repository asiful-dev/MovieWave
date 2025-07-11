import { Router } from "express"
import { getNowPlayingMovies, getUpcomingMovies } from "../controllers/show.controller.js";
import protectAdmin from "../middlewares/auth.middleware.js";

const showRouter = Router();

showRouter.route("/now-playing").get(getNowPlayingMovies);
showRouter.route("/upcoming").get(getUpcomingMovies)


export default showRouter;