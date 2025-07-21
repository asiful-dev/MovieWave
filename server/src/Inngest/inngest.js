import { Inngest } from "inngest"
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js"
import Booking from "../models/booking.models.js"
import Show from "../models/show.models.js"

//new inngest client
const inngest = new Inngest({
    id: "MovieWave"
});


const userCreation = inngest.createFunction(
    { id: "user-creation" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;

            const user = {
                _id: id,
                name: first_name + " " + last_name,
                email: email_addresses[0].email_address,
                avatar: image_url
            }

            await User.create(user);
        } catch (error) {
            console.log("Failed to create user ", error);

        }
    }
)


const userDeleted = inngest.createFunction(
    { id: "user-deleted" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        try {
            const { id } = event.data;
            const response = await User.findByIdAndDelete(id);
            if (!response) throw new ApiError(404, "User Not Found!")
        } catch (error) {
            console.log("Failed to delete user", error);

        }

    }
)

const userUpdated = inngest.createFunction(
    { id: "user-updated" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const updatedUser = {
                _id: id,
                name: first_name + " " + last_name,
                email: email_addresses[0].email_address,
                avatar: image_url
            }
            const response = await User.findByIdAndUpdate(id, updatedUser);;
            if (!response) throw new ApiError(404, "User Not Found!")
        } catch (error) {
            console.log("Failed to update user ", error);
        }
    }
)

const releaseSeatsAndDeleteBooking = inngest.createFunction(
    { id: "release-seats-delete-booking" },
    { event: "app/checkpayment" },
    async ({ event, step }) => {
        const timeLimit = new Date(Date.now() + 10 * 60 * 1000);
        await step.sleepUntil("wait-for-10-minutes", timeLimit);
        await step.run("check-payment-status", async () => {
            const bookingId = event.data.bookingId;
            const booking = await Booking.findById(bookingId);

            if (!booking.isPaid) {
                const show = await Show.findById(booking.show);
                booking.bookedSeats.forEach((seat) => {
                    delete show.occupiedSeats[seat];
                });
                show.markModified("occupiedSeats");
                await show.save();
                await Booking.findByIdAndDelete(booking._id);
            }
        })
    }
)







const functions = [
    userCreation,
    userDeleted,
    userUpdated,
    releaseSeatsAndDeleteBooking,
]

export {
    inngest,
    functions
}