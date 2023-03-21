import axios from 'axios';

const axiosRender = axios.create({
    baseURL: "https://hoteltips.onrender.com",
    withCredentials: true
    // baseURL: "http://localhost:5000"

});

export default axiosRender;