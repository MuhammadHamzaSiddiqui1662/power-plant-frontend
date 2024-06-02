export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:3000/api/v1"
    : "http://localhost:3000/api/v1";
