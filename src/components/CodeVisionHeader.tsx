import { useState } from "react";

import { logout, getToken } from "../auth/auth";
import { useNavigate } from "react-router-dom";

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

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 p-4 bg-[#0B0F1A]">
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

      {/* RIGHT - TAG + LOGOUT */}
      <div className="flex items-center gap-3">
        <button
          // onClick={() => navigate("/learn")}
          className={`text-[10px] ${theme?.text} border ${theme?.border} px-2 py-2 rounded-md`}
        >
          Ranking
        </button>
        <button
          onClick={() => navigate("/learn")}
          className={`text-[10px] ${theme?.text} border ${theme?.border} px-2 py-2 rounded-md`}
        >
          OOP LEARNER
        </button>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`px-4 p-1 rounded-lg ${theme?.text} transition border ${
              loggingOut
                ? `${theme?.border} cursor-not-allowed`
                : `${theme?.border} hover:scale-105 transition-opacity`
            }`}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </div>
  );
}
