import axios from "axios";
import {conf} from "./config.js"

const axiosInstance = axios.create({
    baseURL : conf.serverBaseUrl,
    headers : {
        "Content-Type" : "application/json",
    },
    timeout: 10000,
})

export default axiosInstance;