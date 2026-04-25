import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Authenticated....");
      navigate("/learn");
    } else {
      console.log("Not authenticated....");
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Logging you in...</p>
    </div>
  );
}
