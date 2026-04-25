import { useState } from "react";

import { logout, getToken } from "../auth/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";

type Props = {
  theme?: {
    text?: string;
    border?: string;
  };
};

export default function CodeVisionHeader({ theme }: Props) {
  const [loggingOut, setLoggingOut] = useState(false);
  const isAuthenticated = !!getToken();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex flex-col md:flex-row items-center justify-between border-b border-gray-800 p-4 bg-[#0B0F1A]">
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <h1
          className={`text-lg md:text-xl font-black tracking-widest ${
            theme?.text || "text-white"
          }`}
        >
          CODEVISION
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Ranking ALWAYS visible */}
        <button
          onClick={() => navigate("/ranking")}
          className={`flex items-center gap-2 text-xs font-bold ${theme?.text} border ${theme?.border} px-3 py-2 rounded-lg`}
        >
          <Trophy className="w-4 h-4 text-yellow-400" />
          Ranking
        </button>

        {/* ONLY show Learn if NOT on auth/public pages */}
        {!["/login", "/register"].includes(path) && (
          <button
            onClick={() => navigate("/learn")}
            className={`text-[10px] ${theme?.text} border ${theme?.border} px-2 py-2 rounded-md`}
          >
            OOP LEARNER
          </button>
        )}

        {/* Logout only if authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`px-4 p-1 rounded-lg ${theme?.text} border ${theme?.border}`}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </div>
  );
}
