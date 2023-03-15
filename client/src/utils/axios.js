import axios from 'axios';

const axiosRender = axios.create({
    baseURL: "https://hoteltips.onrender.com"
    // baseURL: "http://localhost:5000"

});

export default axiosRender;