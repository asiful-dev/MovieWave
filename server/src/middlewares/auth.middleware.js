import { clerkClient } from "@clerk/express";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

const protectAdmin = AsyncHandler(async (req, _, next) => {
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);

        if (!user) throw new ApiError(404, "User Not Found");

        if (user.privateMetadata.role !== "admin")
            throw new ApiError(401, "Not Authorized")

        next();
    } catch (error) {
        throw new ApiError(401, "Not Authorized");
    }
})

export default protectAdmin;