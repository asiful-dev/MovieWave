import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"



const getUserBookings = asyncHandler(async(req,res)=>{
    //get user id from clerk middleware by accessing req.auth()
    
})


export {
    getUserBookings,
}