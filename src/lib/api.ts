import axios from "axios";

export const omdbAPI = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
});
