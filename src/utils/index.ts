export const storeSessionToLocalStorage = (session: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("expires_at", session.expires_at);
    localStorage.setItem("expires_in", session.expires_in);
    localStorage.setItem("refresh_token", session.refresh_token);
    localStorage.setItem("user", JSON.stringify(session.user));
  }
};
