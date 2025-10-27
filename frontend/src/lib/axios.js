import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api"
const api = axios.create({
    baseURL: BASE_URL,
})

export default api;