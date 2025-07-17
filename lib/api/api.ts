// import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",

//   withCredentials: true,
// });
import axios from "axios";

// Клиентские запросы идут на Next.js API роуты
export const nextServer = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Серверные запросы идут на внешний API
export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});
