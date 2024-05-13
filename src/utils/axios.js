import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://course-selling-app-server.onrender.com"
})