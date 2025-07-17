// import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",

//   withCredentials: true,
// });
import axios from "axios";

export const nextServer = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});
