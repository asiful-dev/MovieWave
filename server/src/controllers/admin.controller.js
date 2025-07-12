import AsyncHandler from "../utils/AsyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

const isAdmin = AsyncHandler(async (_, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "The User is Admin!",
                {
                    isAdmin: true
                }
            )
        )
})



export {
    isAdmin
}