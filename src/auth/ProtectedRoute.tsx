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

if (loading) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0B0F1A] text-white">

      <img
        src="/pokeball.svg"
        alt="loading"
        className="w-32 h-32 animate-bounce"
      />

      <p className="mt-6 text-lg font-bold">
        Loading OOP Data...
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Connecting to Pokédex...
      </p>
    </div>
  );
}

  if (!valid) return <Navigate to="/login" replace />;

  return children;
}