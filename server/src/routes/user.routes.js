import { Router } from "express"
import { getOccupiedSeats } from "../controllers/booking.controller.js";
import { getUserBookings } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/bookings").get(getUserBookings);


export default userRouter;