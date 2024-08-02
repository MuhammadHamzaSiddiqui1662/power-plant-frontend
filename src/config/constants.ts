export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://power-plant-2a6a23ab8691.herokuapp.com/api/v1"
    : "http://localhost:3001/api/v1";
