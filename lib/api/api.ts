import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",

  withCredentials: false,
});
// import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: "https://notehub-api.goit.study",
//   withCredentials: false,
// });
