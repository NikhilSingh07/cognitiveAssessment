import axios from "axios";

const axiosinstance = axios.create({
    baseURL: "https://localhost:3000",
});

export default axiosinstance;