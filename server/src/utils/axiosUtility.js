import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        "Content-Type": "application/json"
    }
});

const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        const response = await apiClient({
            method,
            url,
            data,
            ...config
        })

        return (response.data ? response.data : []);
    } catch (error) {
        console.error('API Request Error:', error.response?.data || error.message);
        throw error;
    }
}

const apiGet = (url, config = {}) => apiRequest('GET', url, null, config);
const apiPost = (url, data, config = {}) => apiRequest('POST', url, data, config);
const apiPut = (url, data, config = {}) => apiRequest('PUT', url, data, config);
const apiDelete = (url, config = {}) => apiRequest('DELETE', url, null, config);


export {
    apiRequest,
    apiGet,
    apiPost,
    apiPut,
    apiDelete
}