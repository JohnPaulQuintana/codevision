import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPokemon } from "../../../../../lib/pokeapi";
import CodeVisionHeader from "../../../../../components/CodeVisionHeader";
import { ArrowLeft, Check, X } from "lucide-react";

import { POKEMON_LIST } from "../data/pokemons";
import { getTypeColor } from "../lib/typeColors";

import QuizEditor from "../components/QuizEditor";
import { type Language } from "../../../../../types/language";

export default function QuizSimulation() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [result, setResult] = useState<"idle" | "success" | "fail">("idle");

  //   const resetTimeoutRef = useState<any>(null);

  // =========================
  // TEMPLATE
  // =========================
  const generateTemplate = () => `
// Class definition
class Pokemon {

 // Constructor runs when object is created
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

// Method: behavior of object
  i_choose_you() {
    console.log(\`\${this.name} uses \${this.type} attack!\`);
  }
}

// Creating object instance
const pokemon = new Pokemon("___", "___");

// Execute move
pokemon.i_choose_you();
`;

  // =========================
  // LOAD GAME
  // =========================
  const loadGame = async () => {
    const random =
      POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];

    const p = await getPokemon(random);

    setPokemon(p);
    setCode(generateTemplate());
    setResult("idle");
  };

  useEffect(() => {
    loadGame();
  }, []);

  const theme = pokemon ? getTypeColor(pokemon.type) : "";

  // =========================
  // RESET FLOW
  // =========================
  const resetRound = () => {
    loadGame();
  };

  const handleSuccess = () => {
    setResult("success");

    setTimeout(() => {
      resetRound();
    }, 2500);
  };

  const handleFail = () => {
    setResult("fail");

    setTimeout(() => {
      resetRound();
    }, 2000);
  };

  // =========================
  // VALIDATION
  // =========================
  const checkAnswer = () => {
    if (!pokemon) return;

    const normalized = code.toLowerCase();

    const isCorrect =
      normalized.includes(pokemon.name.toLowerCase()) &&
      normalized.includes(pokemon.type.toLowerCase());

    if (isCorrect) handleSuccess();
    else handleFail();
  };

  if (!pokemon) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div>
      <CodeVisionHeader
        theme={{
          text: theme.split(" ")[1],
          border: theme.split(" ")[0],
        }}
      />

      <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col md:flex-row">
        {/* LEFT - EDITOR */}
        <div className="w-full md:w-[55%] bg-[#0F172A] border-r border-gray-800 flex flex-col h-screen">
          <div className="p-5 border-b border-gray-800 flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className={`flex items-center gap-2 ${theme}`}
            >
              <ArrowLeft size={18} />
              Surrender
            </button>
          </div>

          <div className="flex-1 px-3">
            <QuizEditor
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              isMobile={false}
              onRun={checkAnswer}
            />
          </div>
        </div>

        {/* RIGHT - GAME */}
        <div className="flex-1 p-6 flex flex-col gap-2">
          <motion.h1 className={`text-3xl font-black uppercase ${theme}`}>
            Code Challenge
          </motion.h1>

          <p className="text-gray-500 text-sm">
            Identify the hidden Pokémon object from runtime state
          </p>

          {/* ========================= */}
          {/* POKEMON DISPLAY */}
          {/* ========================= */}
          <div className="relative w-full h-[420px] flex items-center justify-center bg-[#0B1220] rounded-2xl border border-gray-800 overflow-hidden">
            <img
              src={pokemon.sprite}
              className="w-80 h-80 blur-md scale-125 opacity-80"
            />

            <AnimatePresence>
              {result === "idle" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-gray-300 text-sm">Who's that pokemon ?</p>
                </motion.div>
              )}

              {result === "success" && (
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/10">
                  <Check className="text-green-400 w-10 h-10" />
                  <p className="text-green-400 mt-2">Correct</p>
                </motion.div>
              )}

              {result === "fail" && (
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/10">
                  <X className="text-red-400 w-10 h-10" />
                  <p className="text-red-400 mt-2">Wrong</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
