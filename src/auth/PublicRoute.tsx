import { Navigate } from "react-router-dom";
import { getToken } from "./auth";

export default function PublicRoute({ children }: any) {
  const token = getToken();

  if (token) {
    return <Navigate to="/oop/lesson-1" replace />;
  }

  return children;
}