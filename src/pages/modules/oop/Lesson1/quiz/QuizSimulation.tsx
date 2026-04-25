import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPokemon } from "../../../../../lib/pokeapi";
import CodeVisionHeader from "../../../../../components/CodeVisionHeader";
import { ArrowLeft, Check, X, Trophy, Star } from "lucide-react";
import { POKEMON_LIST } from "../data/pokemons";
import { getTypeColor } from "../lib/typeColors";
import QuizEditor from "../components/QuizEditor";
import { type Language } from "../../../../../types/language";
import { api } from "../../../../../auth/api";

export default function QuizSimulation() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "fail">("idle");
  const [nameStatus, setNameStatus] = useState<"idle" | "correct" | "wrong">(
    "idle",
  );
  const [typeStatus, setTypeStatus] = useState<"idle" | "correct" | "wrong">(
    "idle",
  );
  const [message, setMessage] = useState("");

  // GAME STATS
  const [xp, setXp] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingNext, setLoadingNext] = useState(false);

  // debounce (FIXED: useRef instead of state)
  const debounceRef = useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const startTimeRef = useRef<number>(0);
  const attemptLockRef = useRef(false);
  const [module, setModule] = useState<any>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // =========================
  // TEMPLATE
  // =========================
  const generateTemplate = () => `
// Define class
class Pokemon {

  // Constructor
  constructor(name, type) {
    this.name = name; // store name
    this.type = type; // store type
  }

  // Method: display info
  display() {
    console.log("Name:", this.name); // print name
    console.log("Type:", this.type); // print type
  }
}

// Create object
const pikachu = new Pokemon("____", "____");

// Call method
pikachu.display();
`;

  // =========================
  // LOAD GAME
  // =========================
  const loadGame = async () => {
    setLoadingNext(true);

    const random =
      POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];

    const p = await getPokemon(random);

    setPokemon(p);

    // timer reset
    startTimeRef.current = Date.now();
    attemptLockRef.current = false;

    // reset all states
    setNameInput("");
    setTypeInput("");
    setResult("idle");
    setMessage("");
    setNameStatus("idle");
    setTypeStatus("idle");

    setCode(generateTemplate());

    setLoadingNext(false);
  };

  // Load where user left
  const userStage = async () => {
    try {
      const response = await api("/module/status", {
        method: "GET",
      });

      if (response.ok) {
        setModule(response.data);
        setXp(response?.data.total_xp || 0);
        setShowIntro(response?.data.progress == 100 ? false : true);
        setShowCompleteModal(response?.data.progress == 100 ? true : false);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserProgressAndXp = async (body: object) => {
    try {
      const response = await api("/module/progress/update", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // setModule(response.data);
        // setXp(response.data.total_xp || 0);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!showIntro) {
      loadGame();
    }
  }, [showIntro]);

  useEffect(() => {
    console.log(logs, loadingNext);
    loadGame();
    userStage();
  }, []);

  // send update to progress every expchange
  useEffect(() => {
    const updateProgress = async () => {
      console.log("Update progress...");
    };

    updateProgress();
  }, [xp]);
  const theme = pokemon ? getTypeColor(pokemon.type) : "";

  // =========================
  // LIVE SYNC: CODE EDITOR ALWAYS MATCH INPUT
  // =========================
  useEffect(() => {
    if (!pokemon) return;

    const updatedCode = `
    // Define class
class Pokemon {

  // Constructor
  constructor(name, type) {
    this.name = name; // store name
    this.type = type; // store type
  }

  // Method: display info
  display() {
    console.log("Name:", this.name); // print name
    console.log("Type:", this.type); // print type
  }
}

// Create object
const pokemon = new Pokemon("${nameInput || "____"}", "${typeInput || "____"}");

// Call method
pokemon.display();
      `;

    setCode(updatedCode);
  }, [nameInput, typeInput, pokemon]);

  // =========================
  // DEBOUNCED VALIDATION (FIXED)
  // =========================
  useEffect(() => {
    if (!pokemon) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const nameOk =
        nameInput.trim().toLowerCase() === pokemon.name.toLowerCase();

      const typeOk =
        typeInput.trim().toLowerCase() === pokemon.type.toLowerCase();

      setNameStatus(!nameInput ? "idle" : nameOk ? "correct" : "wrong");

      setTypeStatus(!typeInput ? "idle" : typeOk ? "correct" : "wrong");

      // only count attempt when user actually types both
      const hasBothInputs = nameInput.trim() && typeInput.trim();
      if (!hasBothInputs) return;

      // =========================
      // SUCCESS
      // =========================
      if (nameOk && typeOk) {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setResult("success");

        // only count attempt ONCE
        if (!attemptLockRef.current) {
          setAttempts((a) => a + 1);
          attemptLockRef.current = true;
        }

        const endTime = Date.now();
        const timeTakenSec = (endTime - startTimeRef.current) / 1000;

        const baseXP = module?.xp_reward ?? 100;
        const attemptPenalty = attempts * 15;
        const timePenalty = timeTakenSec * 1.5;

        let earnedXp = baseXP - attemptPenalty - timePenalty;
        earnedXp = Math.max(20, Math.floor(earnedXp));

        setXp((prev) => prev + earnedXp);

        setLogs((prev) => [
          {
            pokemon: pokemon.name,
            xp: earnedXp,
            attempts: attempts + 1,
            success: true,
            time: new Date().toISOString(),
          },
          ...prev,
        ]);

        // update server for user progress and xp
        updateUserProgressAndXp({
          module_id: module?.id,
          stage: module?.stage + 1,
          xp: earnedXp, // NOT total xp
        });
        setMessage("");

        setTimeout(() => {
          loadGame();
          userStage();
          setIsTransitioning(false);
        }, 4500);

        return;
      }

      // =========================
      // FAIL
      // =========================
      else if (nameInput && typeInput) {
        if (isTransitioning) return; // ❌ prevent override

        setResult("fail");

        if (!nameOk || !typeOk) {
          if (isTransitioning) return;

          // only allow 1 attempt per round
          if (!attemptLockRef.current && nameInput && typeInput) {
            setAttempts((a) => a + 1);
            attemptLockRef.current = true;
          }

          setResult("fail");

          let msg = "";

          if (!nameOk && !typeOk) {
            msg = "Both name and type are wrong!";
          } else if (!nameOk) {
            msg = "Wrong Pokémon name!";
          } else {
            msg = "Wrong Pokémon type!";
          }

          setMessage(msg);

          setTimeout(() => {
            setResult("idle");
            setMessage("");
          }, 2000);

          return;
        }
      }
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [nameInput, typeInput, pokemon]);

  if (!pokemon) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div>
      <AnimatePresence>
        {showCompleteModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`bg-[#0B1220] border ${theme} p-6 rounded-2xl w-[90%] md:w-[420px] text-white text-center`}
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
            >
              <div className="flex flex-col items-center gap-2 mb-4">
                <Trophy className="w-12 h-12 text-yellow-400" />

                <h2 className={`text-2xl font-bold ${theme}`}>
                  Congratulations!
                </h2>
              </div>

              <p className="text-lg text-gray-300">You completed:</p>

              <p className="text-xl font-bold text-white mt-1">
                {module?.title}
              </p>

              <div className="mt-4 p-4 bg-black/40 rounded-lg flex flex-col items-center gap-2">
                <Star className="w-6 h-6 text-green-400" />

                <p className="text-sm text-gray-400">Total XP</p>
                <p className="text-3xl font-bold text-green-400">{xp}</p>
              </div>

              <div className="mt-4 text-sm text-gray-400">Completed on:</div>

              <p className="text-sm text-white font-medium">
                {formatDateTime(module?.updated_at)}
              </p>

              <button
                onClick={() => {
                  setShowCompleteModal(false);
                  setIsTransitioning(false);

                  // optional: redirect or go back
                  window.location.href = "/learn";
                }}
                className={`mt-6 w-full border ${theme} py-2 rounded-lg font-bold`}
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`bg-[#0B1220] border ${theme} p-6 rounded-2xl w-[90%] md:w-[600px] text-white`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h1 className={`text-2xl font-bold mb-4 uppercase ${theme}`}>
                Class & Object Basics
              </h1>

              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  <span className={`${theme} font-bold`}>Class</span> is a
                  blueprint for creating objects.
                </p>

                <p>
                  Example: A <span className={`${theme}`}>Pokemon class </span>
                  defines name and type.
                </p>

                <div className="bg-black/40 p-3 rounded">
                  class Pokemon {"{"}
                  <br />
                  &nbsp;&nbsp;constructor(name, type) {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;this.name = name;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;this.type = type;
                  <br />
                  &nbsp;&nbsp;{"}"}
                  <br />
                  {"}"}
                </div>

                <p>
                  <span className={`font-bold ${theme}`}>Object</span> is a real
                  instance of a class.
                </p>

                <div className="bg-black/40 p-3 rounded">
                  const pikachu = new Pokemon("___", "___");
                </div>
              </div>

              <button
                onClick={() => setShowIntro(false)}
                className={`mt-6 w-full border ${theme} text-black font-bold py-2 rounded-lg`}
              >
                <span className={`${theme}`}>Start Challenge</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CodeVisionHeader
        theme={{
          text: theme.split(" ")[1],
          border: theme.split(" ")[0],
        }}
      />

      <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col md:flex-row">
        {/* LEFT */}
        <div className="flex-1 p-6 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className={`flex items-center gap-2 ${theme}`}
            >
              <ArrowLeft size={18} />
              Surrender
            </button>
            <p className={`text-sm border p-1 rounded-md ${theme} text-md`}>
              Total Stage: {module?.challenge}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.h1 className={`text-3xl font-black uppercase ${theme}`}>
              Code Challenge
            </motion.h1>

            <p className={`text-sm ${theme} text-md`}>
              XP: {xp} | Attempts: {attempts} | Stage: {module?.stage}
            </p>
          </div>

          {/* POKEMON DISPLAY */}
          <div className="relative w-full h-[300px] flex items-center justify-center bg-[#0B1220] rounded-2xl border border-gray-800 overflow-hidden">
            <img
              src={pokemon.sprite}
              className={`w-60 h-60 transition-all duration-700 ${
                result === "success"
                  ? "blur-0 scale-100"
                  : "blur-md scale-125 opacity-80"
              }`}
            />

            <AnimatePresence>
              {result === "idle" && (
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  <span className={`${theme} text-9xl font-bold`}>?</span>
                </motion.div>
              )}

              {result === "success" && (
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <Check className="text-green-400 w-14 h-14" />
                  <p className="text-green-400 text-xl font-bold mt-2">
                    +{xp} XP
                  </p>
                  <p className="text-white text-sm mt-1">
                    Next Pokémon loading...
                  </p>
                </motion.div>
              )}

              {result === "fail" && (
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/10">
                  <X className="text-red-500 w-10 h-10" />
                  <p className="text-red-400 mt-2">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col items-start gap-3 p-4">
            <h1 className={`text-xl font-black ${theme}`}>Object Pokemon</h1>

            <div className="flex items-center gap-4 w-full">
              <input
                className={`w-full p-2 rounded bg-gray-800 border ${
                  nameStatus === "correct"
                    ? "border-green-500"
                    : nameStatus === "wrong"
                      ? "border-red-500"
                      : "border-gray-700"
                }`}
                placeholder="Name"
                value={nameInput}
                onChange={(e) => {
                  if (isTransitioning) return;
                  setNameInput(e.target.value);
                }}
              />

              <input
                className={`w-full p-2 rounded bg-gray-800 border ${
                  typeStatus === "correct"
                    ? "border-green-500"
                    : typeStatus === "wrong"
                      ? "border-red-500"
                      : "border-gray-700"
                }`}
                placeholder="Type"
                value={typeInput}
                onChange={(e) => {
                  if (isTransitioning) return;
                  setTypeInput(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT - CODE EDITOR */}
        <div className="w-full md:w-[55%] bg-[#0F172A] border-l border-gray-800 flex flex-col h-screen">
          <div className="flex-1 px-3">
            <QuizEditor
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              isMobile={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
