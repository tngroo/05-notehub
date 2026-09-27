import axios from "axios";

export const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
}
})
