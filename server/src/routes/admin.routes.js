import { Router } from "express"
import protectAdmin from "../middlewares/auth.middleware.js"
import { getAllBookings, getDashBoardData, isAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router();

// adminRouter.use(protectAdmin);
adminRouter.route("/is-admin").get(isAdmin);
adminRouter.route("/dashboard").get(getDashBoardData);
adminRouter.route("/all-bookings").get(getAllBookings)

export default adminRouter;