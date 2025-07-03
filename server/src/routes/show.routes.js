import { Router } from "express"
import { getNowPlayingMovies, getUpcomingMovies } from "../controllers/show.controller";


const router = Router();

router.route("/now-playing").get(getNowPlayingMovies);
router.route("/upcoming").get(getUpcomingMovies);


export default router;