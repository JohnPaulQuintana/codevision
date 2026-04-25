import { getToken } from "./auth";

// Development
// const BASE_URL = "http://127.0.0.1:8000/api";
// Production
const BASE_URL = "https://codevision.exousia.online/public/api";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => null);

  console.log(data)
  // if(data.message === "Unauthenticated") return logout()

  return {
    status: res.status,
    ok: res.ok,
    data,
  };
};