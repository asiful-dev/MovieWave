import { Schema, model } from "mongoose"

const showSchema = new Schema({
    movie: {
        type: String,
        ref: "Movie",
        required: true
    },
    showDateTime: {
        type: Date,
        requird: true,
    },
    showPrice: {
        type: Number,
        required: true
    },
    occupiedSeats: {
        type: Object,
        default: {}
    }
}, { minimize: false, timestamps: true });

export const Show = model("Show", showSchema);
