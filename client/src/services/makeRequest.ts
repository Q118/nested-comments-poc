import axios from "axios";

const SERVER_URL = "http://localhost:2242/";

const api = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeRequest(url: string, options?: any) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"));
}