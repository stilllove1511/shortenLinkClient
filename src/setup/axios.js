import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../constants";

const instance = axios.create({
    baseURL,
});

instance.defaults.withCredentials = true;

instance.defaults.headers.common[
    "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status =
            (error && error.response && error.response.status) || 500;
        switch (status) {
            case 401: {
                return error.response.data;
            }
            case 403: {
                toast.error(`You don't have permission to this recource`);
                return Promise.reject(error);
            }
            case 404: {
                return Promise.reject(error);
            }
            case 405: {
                return Promise.reject(error);
            }
            default: {
                return Promise.reject(error);
            }
        }
    }
);

export default instance;
