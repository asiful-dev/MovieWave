import apiError from "./apiError.js";

const createShowsFromInput = (showsInput, movieId, showPrice) => {
    
    if (!Array.isArray(showsInput) || showsInput.length === 0)
        throw new apiError(400, "showsInput must be a non-empty array");
    if (!showPrice || showPrice <= 0)
        throw new apiError(400, "showPrice must be a positive number");



    return showsInput.flatMap(show =>
        show.time.map(time => ({
            movie: movieId,
            showDateTime: new Date(`${show.date}T${time}`),
            showPrice,
            occupiedSeats: {}
        }))
    );
}

export default createShowsFromInput;