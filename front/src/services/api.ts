import axios from "axios";

export const BASE_URL = "https://blog-cainara.onrender.com" 
// const URL = "http://localhost:3000"

export const api = axios.create({
    baseURL: BASE_URL
})