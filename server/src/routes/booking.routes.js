import { Router } from "express"
import { createBooking, getOccupiedSeats } from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.route("/create").post(createBooking);
bookingRouter.route("/seats/:showId").get(getOccupiedSeats);

export default bookingRouter;