import axios from "axios";

export const API_BASE_URL = "http://localhost:9090";

export const USER_API_URL = "http://localhost:9090";

const jwtToken = localStorage.getItem("jwt");

export const api = axios.create({USER_API_URL,
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "Content-Type" : "application/json"
}})