import { useState, useEffect, useMemo } from "react";
import { setToken } from "../auth/auth";
import { api } from "../auth/api";
import { User, Lock, LogIn } from "lucide-react";
import { getPokemon } from "../lib/pokeapi";
import { motion, AnimatePresence } from "framer-motion";
import CodeVisionHeader from "../components/CodeVisionHeader";

const POKEMON_LIST = [
  "pikachu",
  "charmander",
  "bulbasaur",
  "squirtle",
  "eevee",
];

// THEME SYSTEM
function getTheme(type?: string) {
  switch (type) {
    case "electric":
      return {
        background: "bg-yellow-500/10",
        gradient: "from-yellow-400 to-yellow-600",
        glow: "shadow-yellow-500/20",
        border: "border-yellow-400/50",
        soft: "bg-yellow-500/10",
        text: "text-yellow-300",
      };

    case "fire":
      return {
        background: "bg-orange-500/10",
        gradient: "from-orange-400 to-red-500",
        glow: "shadow-red-500/20",
        border: "border-red-400/50",
        soft: "bg-red-500/10",
        text: "text-red-300",
      };

    case "water":
      return {
        background: "bg-blue-500/10",
        gradient: "from-blue-400 to-cyan-500",
        glow: "shadow-blue-500/20",
        border: "border-blue-400/50",
        soft: "bg-blue-500/10",
        text: "text-blue-300",
      };

    case "grass":
      return {
        background: "bg-green-500/10",
        gradient: "from-green-400 to-emerald-500",
        glow: "shadow-green-500/20",
        border: "border-green-400/50",
        soft: "bg-green-500/10",
        text: "text-green-300",
      };

    default:
      return {
        background: "bg-indigo-500/10",
        gradient: "from-indigo-400 to-blue-500",
        glow: "shadow-blue-500/20",
        border: "border-blue-400/50",
        soft: "bg-blue-500/10",
        text: "text-blue-300",
      };
  }
}

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);
  const [bgPokemon, setBgPokemon] = useState<any>(null);

  useEffect(() => {
    const loadBg = async () => {
      const random =
        POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];
      const data = await getPokemon(random);

      setPokemon(data);
      setBgPokemon(data);
    };

    loadBg();
    const interval = setInterval(loadBg, 8000);
    return () => clearInterval(interval);
  }, []);

  const theme = useMemo(() => getTheme(pokemon?.type), [pokemon]);

  const login = async () => {
    try {
      setLoading(true);

      // use global API wrapper instead of fetch
      const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok && response.data?.token) {
        setToken(response.data.token);
        window.location.href = "/oop/lesson-1";
      } else {
        alert("Login failed");
      }
    } catch (err: any) {
      alert(err?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://127.0.0.1:8000/api/auth/google";
  };

  // const loginWithGithub = () => {
  //   window.location.href = "http://127.0.0.1:8000/api/auth/github";
  // };

  return (
    <div className="h-screen overflow-y-auto scrollbar-modern">
      <CodeVisionHeader theme={theme} />
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white relative overflow-hidden">
        {/* BACKGROUND ORB */}
        <div
          className={`absolute w-[600px] h-[600px] ${theme.background} blur-3xl rounded-full animate-pulse z-10`}
        />
        {/* 🌫 BACKGROUND */}
        <AnimatePresence mode="wait">
          {bgPokemon && (
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-2 md:px-16 pointer-events-none w-full z-20">
              {/* NAME (LEFT) */}
              <motion.h1
                key={bgPokemon.name + "-text"}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 0.08, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 1.5 }}
                className={`text-[90px] md:text-[120px] font-black uppercase ${theme.text} tracking-widest select-none`}
              >
                {bgPokemon.name}
              </motion.h1>

              {/* IMAGE (RIGHT) */}
              <motion.img
                key={bgPokemon.name + "-img"}
                src={bgPokemon.sprite}
                className="w-[500px] opacity-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.15, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* LOGIN CARD */}
        <div
          className={`relative w-[380px] p-6 rounded-2xl border ${theme.border} bg-transparent shadow-xl z-30`}
        >
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1
              className={`text-4xl font-black tracking-widest bg-gradient-to-r ${theme.gradient} text-transparent bg-clip-text`}
            >
              CODEVISION
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Trainer Authentication System
            </p>
          </div>

          {/* USERNAME */}
          <div className="relative mb-3">
            <User className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
            <input
              type="text"
              placeholder="Trainer Name"
              className="w-full pl-10 p-3 rounded-lg bg-[#111827] border border-blue-500/30 focus:border-blue-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
            <input
              type="password"
              placeholder="Secret Code"
              className="w-full pl-10 p-3 rounded-lg bg-[#111827] border border-blue-500/30 focus:border-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={login}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold bg-gradient-to-r ${theme.background} border ${theme.border} hover:scale-105 transition shadow-lg`}
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Authenticating..." : "Enter System"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-gray-700 flex-1"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px bg-gray-700 flex-1"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="space-y-2">
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-white text-black hover:bg-gray-100 transition border border-gray-300"
            >
              <img src="/google-icon.png" className="w-4 h-4" />
              Continue with Google
            </button>

            <button
              // onClick={loginWithGithub}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0d1117] hover:bg-[#161b22] transition border border-gray-700"
            >
              <img src="/github-icon.png" className="w-4 h-4" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
