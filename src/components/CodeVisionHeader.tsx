import { useState } from "react";

import { logout, getToken, getName } from "../auth/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Code, Trophy } from "lucide-react";

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
  const name = getName();
  const [open, setOpen] = useState(false);
  console.log(name);
  const getAvatar = (name: string) =>
    `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`;

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between border-b border-gray-800 p-4 bg-[#0B0F1A]">
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
          className={`flex items-center gap-2 text-xs font-bold border border-yellow-400 px-3 py-2 rounded-lg`}
        >
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400">Ranking</span>
        </button>

        {/* ONLY show Learn if NOT on auth/public pages */}
        {!["/login", "/register"].includes(path) && (
          <button
            onClick={() => navigate("/learn")}
            className={`flex items-center gap-1 text-[10px] ${theme?.text} border ${theme?.border} px-2 py-2 rounded-md`}
          >
            <Code size={14} />
            OOP LEARNER
          </button>
        )}

        {/* Logout only if authenticated */}
        {isAuthenticated && (
          <div className="relative text-center">
            <img
              src={getAvatar(name || "user")}
              onClick={() => setOpen(!open)}
              className={`w-10 h-10 mx-auto rounded-full border ${theme?.border} cursor-pointer`}
            />

            {open && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 p-3 rounded-lg shadow-lg border bg-[#0B0F1A] z-50 ${theme?.border}`}
              >
                <p className={`mb-2 ${theme?.text}`}>{name || "User"}</p>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className={`px-4 py-1 rounded-lg border ${theme?.text} ${theme?.border}`}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
