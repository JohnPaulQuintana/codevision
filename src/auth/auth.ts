import { api } from "./api";

export const getToken = () => localStorage.getItem("token");

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

// REAL LOGOUT
export const logout = async () => {
  try {
    await api("/logout", {
      method: "POST",
    });
  } catch (err) {
    // ignore errors (token might already be invalid)
  }

  clearToken();
  window.location.href = "/login";
};