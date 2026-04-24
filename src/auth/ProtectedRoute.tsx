import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, logout } from "./auth";
import { api } from "../auth/api";

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

    // use global API wrapper instead of fetch
    api("/me")
      .then(() => {
        setValid(true);
      })
      .catch(() => {
        logout(); // auto clear invalid session
        setValid(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!valid) return <Navigate to="/login" replace />;

  return children;
}