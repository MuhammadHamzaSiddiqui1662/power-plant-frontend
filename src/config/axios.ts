import axios from "axios";
import { BACKEND_URL } from "./constants";

let accessToken = "";

// Check if we are on the client-side
if (typeof window !== "undefined") {
  const session = localStorage.getItem("session");
  if (session) {
    accessToken = JSON.parse(session)["access_token"];
  }
}

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    common: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
});
