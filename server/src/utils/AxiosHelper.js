import axios from "axios"
import ApiError from "./ApiError.js";

const axiosClient = axios.create({

    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
});

const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        const response = await axiosClient({
            method,
            url,
            data,
            ...config
        });

        return (response.data ? response.data : []);
    } catch (error) {
        // Log the full Axios error object for maximum detail
        console.error('Detailed API Request Error:', error);

        // Also log specific parts if available
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
            console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an http.ClientRequest in node.js
            console.error('Error Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', error.message);
        }

        // Always throw a generic error to the calling function, but now you have more info in logs
        throw new ApiError(500, "API Request Error"); // You might want to pass error.response.status here
    }
}


const apiGet = (url, config = {}) => apiRequest('GET', url, null, config);
const apiPost = (url, data, config = {}) => apiRequest('POST', url, data, config);
const apiPut = (url, data, config = {}) => apiRequest('PUT', url, data, config);
const apiDelete = (url, config = {}) => apiRequest('DELETE', url, null, config);


export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
}