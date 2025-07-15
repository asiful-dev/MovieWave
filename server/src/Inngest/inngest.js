import { Inngest } from "inngest"
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js"
import Booking from "../models/booking.models.js"
import Show from "../models/show.models.js"
import sendEmail from "../utils/nodemailer.js";

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

const sendBookingConfirmationEmail = inngest.createFunction(
    { id: "send-booking-confirmation-email" },
    { event: "app/show.booked" },
    async ({ event, step }) => {
        const { bookingId } = event.data;

        const booking = await Booking.findById(bookingId).populate({
            path: "show",
            populate: {
                path: "movie",
                model: "movie"
            }
        }).populate("user")

        // Prepare email details
        const showDate = new Date(booking.show.showDateTime).toLocaleDateString("en-US");
        const bookingAmount = booking.amount.toFixed(2);
        const movieTitle = booking.show.movie.title;
        const logoUrl = "https://res.cloudinary.com/dhqemmrzp/image/upload/v1752590882/logo_ddcb9l.png"; // Replace with your actual logo URL

        const seatsList = booking.bookedSeats && booking.bookedSeats.length
            ? booking.bookedSeats.join(", ")
            : "N/A";

        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #eee; border-radius:8px; overflow:hidden; background: #f9fafb;">
            <div style="background: linear-gradient(90deg, #18181b 60%, #6366f1 100%); padding: 24px 0; text-align: center;">
            <img src="${logoUrl}" alt="MovieWave Logo" style="height: 60px; margin-bottom: 10px;" />
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 2px;">MovieWave</h1>
            </div>
            <div style="padding: 32px 24px;">
            <h2 style="color: #6366f1; margin-bottom: 8px;">Payment Confirmed!</h2>
            <p style="font-size: 1.1rem;">Hi <strong>${booking.user.name || booking.user.email}</strong>,</p>
            <p style="margin-bottom: 18px;">Your booking for <span style="color:#18181b; font-weight:800;">${movieTitle}</span> is <span style="color: #22c55e; font-weight:700;">locked in</span>! Get ready for an amazing movie experience.</p>
            <table style="width:100%; margin: 24px 0; border-collapse: collapse; background: #fff; border-radius: 6px; box-shadow: 0 1px 4px #0001;">
            <tr>
                <td style="padding: 10px 0; color: #555;">🎬 <b>Movie</b>:</td>
                <td style="padding: 10px 0; color: #18181b;">${movieTitle}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #555;">📅 <b>Date</b>:</td>
                <td style="padding: 10px 0; color: #18181b;">${showDate}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #555;">💺 <b>Seats</b>:</td>
                <td style="padding: 10px 0; color: #18181b;">${seatsList}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #555;">💳 <b>Amount</b>:</td>
                <td style="padding: 10px 0; color: #18181b;">₹${bookingAmount}</td>
            </tr>
            </table>
            <div style="background: #e0e7ff; padding: 16px; border-radius: 6px; margin-bottom: 18px;">
            <p style="margin:0; color:#3730a3;">Tip: Arrive 15 minutes early to grab your snacks and settle in for the show!</p>
            </div>
            <p style="margin-top:32px;">🍿 Enjoy your movie!<br/><br/> — The MovieWave Team</p>
            <hr style="margin:32px 0 16px 0; border:none; border-top:1px solid #eee;">
            <p style="font-size:0.95rem; color:#888; text-align:center;">Need help? <a href="mailto:asifulislam756@gmail.com" style="color:#6366f1;">Contact support</a></p>
            </div>
            </div>
        `;

        await sendEmail({
            to: booking.user.email,
            subject: `Payment Confirmation: ${movieTitle} Booked`,
            body: emailBody
        })

    }
)





const functions = [
    userCreation,
    userDeleted,
    userUpdated,
    releaseSeatsAndDeleteBooking,
    sendBookingConfirmationEmail,
]

export {
    inngest,
    functions
}