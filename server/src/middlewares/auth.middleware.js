import { auth, clerkClient } from "@clerk/express"
import { apiError } from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"

const protectedAdmin = [
    auth(),
    asyncHandler(async (req, _, next) => {
        const { userId } = req.auth();
        if (!userId) {
            throw new apiError(401, "Not authenticated");
        }

        // Fetch the full user record
        const user = await clerkClient.users.getUser(userId);

        // Check for admin role
        const role = user.privateMetadata?.role;
        if (role !== "admin") {
            throw new apiError(403, "Forbidden: Admins only");
        }

        // All good!
        next();
    })
]

export default protectedAdmin;