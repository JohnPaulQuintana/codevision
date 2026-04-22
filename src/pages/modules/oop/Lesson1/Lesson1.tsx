import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getPokemon } from "../../../../lib/pokeapi";
import CodeVisionHeader from "../../../../components/CodeVisionHeader";

// data
import { POKEMON_LIST } from "./data/pokemons";

// lib
import { getTypeColor } from "./lib/typeColors";
import { generatePokemonCode } from "./lib/codegenerators/pokemonCode";
import PokemonList from "./components/PokemonList";
import ExpandToggleButton from "./components/ExpandToggleButton";
import ActivePokemonCard from "./components/ActivePokemonCard";
import CodeBlock from "./components/CodeBlock";
import { type Language } from "../../../../types/language";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Lesson1() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState<Language>("javascript");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(POKEMON_LIST.map((p) => getPokemon(p)));

      setPokemons(results);
      setSelected(results[0]);
    };

    load();
  }, []);

  const theme = selected ? getTypeColor(selected.type) : "";

  // GENERATED OOP CODE
  const generatedCode = useMemo(() => {
    if (!selected) return "";

    return generatePokemonCode(language, {
      name: selected.name,
      type: selected.type,
    });
  }, [selected, language]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const visiblePokemons = useMemo(() => {
    // 💻 Desktop = always full list
    if (!isMobile) return pokemons;

    // 📱 Mobile logic
    return expanded ? pokemons : pokemons.slice(0, 3);
  }, [expanded, pokemons, isMobile]);

  return (
    <div>
      <CodeVisionHeader
        theme={{
          text: theme.split(" ")[1], // text color class
          border: theme.split(" ")[0], // border color class
        }}
      />
      <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col md:flex-row overflow-hidden">
        {/* ⚡ LEFT - OBJECT INSPECTOR */}
        <div className="relative w-full md:w-80 bg-[#0F172A] border-r border-gray-800 px-4 h-fit md:h-screen flex flex-col">
          {/* HEADER */}
          <div className="p-5 border-b border-gray-800 sticky top-0 bg-[#0F172A]">
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${theme} text-2xl md:text-3xl font-bold`}
            >
              <ArrowLeft className="w-12 h-12 md:w-12 md:h-12" />
              <span className="md:hidden text-xs">Back to home</span>
            </motion.button>

            <h2 className={`text-2xl font-bold ${theme} uppercase`}>
              Object Inspector
            </h2>
            <p className="text-xs text-gray-200 mt-1">
              Click a Pokémon instance
            </p>
          </div>

          {/* SCROLL LIST */}
          <div className="flex-1 overflow-y-auto scrollbar-modern px-3 py-4 space-y-3">
            <PokemonList
              pokemons={visiblePokemons}
              selected={selected}
              setSelected={setSelected}
              setExpanded={setExpanded}
            />
          </div>

          {/* 📱 FLOATING CHEVRON BUTTON */}
          <div className="md:hidden absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
            <ExpandToggleButton
              expanded={expanded}
              setExpanded={setExpanded}
              theme={theme}
            />
          </div>
        </div>

        {/* 🧠 RIGHT - LIVE VIEW + CODE */}
        <div className="flex-1 p-6 md:p-4 overflow-y-auto scrollbar-modern h-screen">
          {/* TITLE */}
          <motion.h1
            className={`text-2xl md:text-4xl uppercase font-black ${theme}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Classes & Objects
          </motion.h1>

          <p className="text-gray-400 text-sm md:text-lg">
            A class defines structure. An object is a live instance in memory.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            <ActivePokemonCard pokemon={selected} theme={theme} />

            <CodeBlock
              code={generatedCode}
              language={language}
              setLanguage={setLanguage}
              copyCode={copyCode}
              copied={copied}
              isMobile={isMobile}
              theme={theme}
            />
          </div>

          {/* SIMPLE INSIGHT */}
          <div className="mt-4 bg-[#111827] border border-gray-800 rounded-xl p-5 text-sm text-gray-300">
            <p className="text-gray-400">
              Each Pokémon instance is created from the same class blueprint.
            </p>

            <p className="mt-2 text-gray-500">
              You are viewing runtime object state + source representation.
            </p>
          </div>

          {/* NEXT / QUIZ BUTTON */}
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                console.log("Go to quiz or next lesson");
                navigate('/oop/quiz')
              }}
              className={`flex items-center px-5 py-2 rounded-lg ${theme} font-semibold text-sm shadow-md`}
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-6 h-6 md:w-6 md:h-6" />

            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
