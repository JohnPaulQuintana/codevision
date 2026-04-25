import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Zap, Flame, Droplet, Leaf } from "lucide-react";
import { getPokemon } from "../lib/pokeapi";
import { useNavigate } from "react-router-dom";
import CodeVisionHeader from "../components/CodeVisionHeader";
import CodeVisionFooter from "../components/Footer";

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

// TYPE ICON
function TypeIcon({ type }: { type?: string }) {
  switch (type) {
    case "fire":
      return <Flame className="w-6 h-6 text-red-400 shrink-0" />;
    case "water":
      return <Droplet className="w-6 h-6 text-blue-400 shrink-0" />;
    case "grass":
      return <Leaf className="w-6 h-6 text-green-400 shrink-0" />;
    default:
      return <Zap className="w-6 h-6 text-yellow-400 shrink-0" />;
  }
}

export default function HomePage() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [bgPokemon, setBgPokemon] = useState<any>(null);

  const navigate = useNavigate();

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

  return (
    <div className="h-screen overflow-y-auto scrollbar-modern bg-[#0B0F1A]">
      <CodeVisionHeader theme={theme} />
      <div className="min-h-screen bg-[#0B0F1A] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-12">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {/* NAME (BACK) */}
          <AnimatePresence mode="wait">
            {bgPokemon && (
              <motion.h1
                key={bgPokemon.name + "-text"}
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 0.06, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 1.5 }}
                className={`
                  absolute z-10 left-0 top-0 h-full
                  flex items-start pl-4 md:pl-10

                  text-[60px] md:text-[160px]
                  font-black uppercase tracking-[0.4em]
                  select-none

                  ${theme.text}

                  [writing-mode: vertical-rl]
                  [text-orientation: upright]
                `}
              >
                {bgPokemon.name}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* 🌫 GLOW (MIDDLE) */}
          <div
            className={`absolute z-20 w-[600px] h-[600px] ${theme.soft} blur-3xl rounded-full`}
          />

          {/* 🖼 POKEMON IMAGE (FRONT) */}
          <AnimatePresence mode="wait">
            {bgPokemon && (
              <motion.img
                key={bgPokemon.name}
                src={bgPokemon.sprite}
                className="relative z-30 w-[600px] md:w-[420px] opacity-90"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 2 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 🧠 LEFT BRAND */}
        <div className="text-center md:text-left z-30">
          <h1
            className={`text-5xl md:text-8xl font-black uppercase bg-gradient-to-r ${theme.gradient} text-transparent bg-clip-text`}
          >
            CodeVision
          </h1>

          <p className="text-gray-200 mt-4 text-xl leading-relaxed">
            Learn Object-Oriented Programming visually using Pokémon
            simulations.
          </p>

          <button
            onClick={() => navigate("/learn")}
            className={`mt-6 px-6 py-3 font-black uppercase text-white rounded-lg bg-gradient-to-r ${theme.gradient} shadow-lg hover:scale-105 transition`}
          >
            Start Learning OOP
          </button>
        </div>

        {/* ========================= */}
        {/* MOBILE LAYOUT (NEW) */}
        {/* ========================= */}
        <div className="w-full md:hidden z-10 mt-6 flex flex-row items-center gap-4">
          {/* LEFT IMAGE */}
          <div
            className={`bg-[#111827] border ${theme.border} rounded-2xl p-3`}
          >
            {pokemon && <img src={pokemon.sprite} className="w-24 h-24" />}
          </div>

          {/* RIGHT ATTRIBUTES */}
          <div className="flex flex-col gap-2 flex-1">
            <div
              className={`flex items-center gap-2 bg-transparent border ${theme.border} rounded-xl px-3 py-2`}
            >
              <Box className="text-blue-400 w-4 h-4" />
              <div>
                <div className="text-gray-400 text-xs uppercase">CLASS</div>
                <div className={`${theme.text} text-sm font-bold uppercase`}>
                  POKEMON
                </div>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 bg-[#0F172A] border ${theme.border} rounded-xl px-3 py-2`}
            >
              <TypeIcon type={pokemon?.type} />
              <div>
                <div className="text-gray-400 text-xs uppercase">
                  attributes
                </div>
                <div className={`${theme.text} text-sm font-bold uppercase`}>
                  {pokemon?.name}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 bg-[#0F172A] border ${theme.border} rounded-xl px-3 py-2`}
            >
              <TypeIcon type={pokemon?.type} />
              <div>
                <div className="text-gray-400 text-xs uppercase">
                  attributes
                </div>
                <div className={`${theme.text} text-sm font-bold uppercase`}>
                  {pokemon?.hp}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 bg-[#0F172A] border ${theme.border} rounded-xl px-3 py-2`}
            >
              <TypeIcon type={pokemon?.type} />
              <div>
                <div className="text-gray-400 text-xs uppercase">
                  attributes
                </div>
                <div className={`${theme.text} text-sm font-bold uppercase`}>
                  {pokemon?.type}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* 🖥 DESKTOP ORBIT SYSTEM */}
        {/* ========================= */}
        <div className="relative w-[460px] h-[460px] hidden md:flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gradient-radial via-transparent to-transparent" />

          {/* CLASS */}
          <motion.div
            className={`absolute top-6 left-1/2 -translate-x-1/2 bg-transparent border ${theme.border} rounded-xl px-4 py-2 flex items-center gap-2`}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Box className="text-blue-400 w-6 h-6" />
            <div>
              <div className="text-gray-400 text-sm uppercase">Class</div>
              <div
                className={`${theme.text} text-xl font-bold uppercase -mt-2`}
              >
                Pokemon
              </div>
            </div>
          </motion.div>

          {/* CENTER */}
          <motion.div
            className={`absolute bg-transparent border ${theme.border} rounded-2xl p-5 flex flex-col items-center shadow-lg`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {pokemon && (
              <>
                <img
                  src={pokemon.sprite}
                  className="w-24 md:w-32 h-24 md:h-32"
                />
                <span
                  className={`${theme.text} font-bold capitalize text-lg mt-2`}
                >
                  {pokemon.name}
                </span>
                <span className="text-xs text-gray-400 uppercase">
                  Object Instance
                </span>
              </>
            )}
          </motion.div>

          {/* LEFT */}
          {/* <motion.div
          className={`flex items-center gap-2 absolute -left-2 top-1/2 -translate-y-1/2 bg-transparent border ${theme.border} rounded-xl px-3 py-2 w-36`}
        >
          <TypeIcon type={pokemon?.type} />
          <div>
            <div className="text-gray-400 text-base uppercase">Name</div>
            <div className={`${theme.text} text-xl font-bold uppercase -mt-2`}>
              {pokemon?.name}
            </div>
          </div>
        </motion.div> */}

          {/* RIGHT */}
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex items-center gap-2 absolute -right-10 top-1/2 -translate-y-1/2 bg-transparent border ${theme.border} rounded-xl px-3 py-2 w-36`}
          >
            <TypeIcon type={pokemon?.type} />
            <div>
              <div className="text-gray-400 text-sm uppercase">Attributes</div>
              <div
                className={`${theme.text} text-xl font-bold uppercase -mt-2`}
              >
                {pokemon?.hp}
              </div>
            </div>
          </motion.div>

          {/* BOTTOM */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/5 bg-transparent border ${theme.border} rounded-xl px-3 py-2 w-40`}
          >
            <TypeIcon type={pokemon?.type} />
            <div>
              <div className="text-gray-400 text-sm uppercase">Attributes</div>
              <div
                className={`${theme.text} text-xl font-bold uppercase -mt-2`}
              >
                {pokemon?.type}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <CodeVisionFooter />
    </div>
  );
}
