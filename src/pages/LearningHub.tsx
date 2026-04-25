import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Zap, Star } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { getPokemon } from "../lib/pokeapi";
import CodeVisionHeader from "../components/CodeVisionHeader";
import { api } from "../auth/api";
import CodeVisionFooter from "../components/Footer";

export type OopModule = {
  id: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Mastery";
  title: string;
  description: string;
  path: string;
  order: number;
  xp_reward: number;
  unlocked: number; // or boolean if you normalize later
  challenge: number; // total challenge
  created_at: string;
  updated_at: string;
};

type RoadmapSection = {
  level: string;
  modules: OopModule[];
};

export default function LearningHub() {
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<any>(null);
  const [bgPokemon, setBgPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadMap] = useState<RoadmapSection[]>([]);

  console.log(loading)
  // const roadmap = [
  //   {
  //     level: "Beginner",
  //     color: "text-blue-400",
  //     modules: [
  //       {
  //         title: "Classes & Objects",
  //         desc: `Understand how a Pokémon is defined (Class) and how each pokemon instance is created with its own data.`,
  //         path: "/oop/lesson-1",
  //         unlocked: true,
  //       },
  //       {
  //         title: "Attributes & Methods",
  //         desc: "Learn how Pokémon store data like HP, type, and behavior like attack() or evolve().",
  //         path: "/oop/lesson-2",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Encapsulation",
  //         desc: "Protect Pokémon stats so they can only be modified through controlled methods.",
  //         path: "/oop/lesson-3",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Abstraction",
  //         desc: "Hide complex battle logic and expose only simple actions like 'attack' or 'defend'.",
  //         path: "/oop/lesson-4",
  //         unlocked: false,
  //       },
  //     ],
  //   },

  //   {
  //     level: "Intermediate",
  //     color: "text-green-400",
  //     modules: [
  //       {
  //         title: "Inheritance",
  //         desc: "Reuse and extend behavior",
  //         path: "/oop/lesson-5",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Polymorphism",
  //         desc: "Many forms, one interface",
  //         path: "/oop/lesson-6",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Constructors",
  //         desc: "Object initialization logic",
  //         path: "/oop/lesson-7",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Getters & Setters",
  //         desc: "Controlled access to data",
  //         path: "/oop/lesson-8",
  //         unlocked: false,
  //       },
  //     ],
  //   },

  //   {
  //     level: "Advanced",
  //     color: "text-yellow-400",
  //     modules: [
  //       {
  //         title: "Static Methods",
  //         desc: "Class-level behavior",
  //         path: "/oop/lesson-9",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Composition",
  //         desc: "Objects inside objects",
  //         path: "/oop/lesson-10",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Method Overriding",
  //         desc: "Change inherited behavior",
  //         path: "/oop/lesson-11",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Interfaces (Concept)",
  //         desc: "Contract-based design",
  //         path: "/oop/lesson-12",
  //         unlocked: false,
  //       },
  //     ],
  //   },

  //   {
  //     level: "Mastery",
  //     color: "text-red-400",
  //     modules: [
  //       {
  //         title: "SOLID Principles",
  //         desc: "Professional OOP design rules",
  //         path: "/oop/lesson-13",
  //         unlocked: false,
  //       },
  //       {
  //         title: "Design Patterns",
  //         desc: "Factory, Singleton, Observer",
  //         path: "/oop/lesson-14",
  //         unlocked: false,
  //       },
  //       {
  //         title: "System Design Thinking",
  //         desc: "Real-world architecture mindset",
  //         path: "/oop/lesson-15",
  //         unlocked: false,
  //       },
  //     ],
  //   },
  // ];

  const POKEMON_LIST = [
    "pikachu",
    "charmander",
    "bulbasaur",
    "squirtle",
    "eevee",
  ];

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

  // collect modules
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);

        const response = await api("/module/lesson", {
          method: "GET",
        });

        if (response.ok) {
          console.log(response?.data);
          setRoadMap(groupRoadmap(response.data));
        } else {
          alert("Failed to load modules");
        }
      } catch (err: any) {
        alert(err?.data?.message || "Error fetching modules");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const groupRoadmap = (data: OopModule[]): RoadmapSection[] => {
    const grouped: Record<string, OopModule[]> = {};

    data.forEach((item) => {
      if (!grouped[item.level]) {
        grouped[item.level] = [];
      }
      grouped[item.level].push(item);
    });

    return Object.keys(grouped).map((level) => ({
      level,
      modules: grouped[level].sort((a, b) => a.order - b.order),
    }));
  };

  // THEME SYSTEM
  function getTheme(type?: string) {
    switch (type) {
      case "electric":
        return {
          gradient: "from-yellow-400/70 to-yellow-600/70",
          glow: "shadow-yellow-500/20",
          border: "border-yellow-400/50",
          soft: "bg-yellow-500/10",
          text: "text-yellow-300",
        };

      case "fire":
        return {
          gradient: "from-orange-400/70 to-red-500/70",
          glow: "shadow-red-500/20",
          border: "border-red-400/50",
          soft: "bg-red-500/10",
          text: "text-red-300",
        };

      case "water":
        return {
          gradient: "from-blue-400/70 to-cyan-500/70",
          glow: "shadow-blue-500/20",
          border: "border-blue-400/50",
          soft: "bg-blue-500/10",
          text: "text-blue-300",
        };

      case "grass":
        return {
          gradient: "from-green-400/70 to-emerald-500/70",
          glow: "shadow-green-500/20",
          border: "border-green-400/50",
          soft: "bg-green-500/10",
          text: "text-green-300",
        };

      default:
        return {
          gradient: "from-indigo-400 to-blue-500",
          glow: "shadow-blue-500/20",
          border: "border-blue-400/50",
          soft: "bg-blue-500/10",
          text: "text-blue-300",
        };
    }
  }

  const theme = useMemo(() => getTheme(pokemon?.type), [pokemon]);

  // start Progress
  const startProgress = async (path: string, module_id: number) => {

      // navigate(path)
      try {
        setLoading(true);

        const response = await api("/module/progress", {
          method: "POST",
          body: JSON.stringify({ module_id }),
        });

        if (response.ok) {
          console.log(response?.data);
          // setRoadMap(groupRoadmap(response.data));
          navigate(path)
        } else {
          alert("Failed to load modules");
        }
      } catch (err: any) {
        alert(err?.data?.message || "Error fetching modules");
      } finally {
        setLoading(false);
      }
  }
  return (
    <div className="px-6 md:px-20 bg-[#0B0F1A]">
      <CodeVisionHeader
        theme={{
          text: theme.text, // text color class
          border: theme.border, // border color class
        }}
      />
      <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-2 flex flex-col items-center">
        {/* 🌫 BACKGROUND */}
        <AnimatePresence mode="wait">
          {bgPokemon && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.img
                key={bgPokemon.name}
                src={bgPokemon.sprite}
                className="w-[600px] opacity-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.15, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            </div>
          )}
        </AnimatePresence>
        {/* TITLE */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* BACK BUTTON */}
          {/* <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center ${theme.text} text-2xl md:text-3xl font-bold`}
          >
            <ArrowLeft className="w-12 h-12 md:w-12 md:h-12" />
            <span className="md:hidden text-xs">Back to home</span>
          </motion.button> */}

          {/* TITLE */}
          <motion.h1
            className={`${theme.text} text-4xl md:text-6xl font-black text-center uppercase`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            OOP Skill Tree
          </motion.h1>

          {/* SPACER (keeps center alignment) */}
          <div className="w-[48px] md:w-[80px]" />
        </div>

        <p className="text-gray-200 text-center mt-3 max-w-xl text-base">
          Unlock programming skills step by step. Each lesson evolves your
          understanding like a Pokémon training journey.
        </p>

        {/* ROADMAP */}
        <div className="w-full max-w-5xl mt-14 space-y-12">
          {roadmap.map((section, i) => (
            <div key={i}>
              {/* LEVEL TITLE */}
              <div className={`flex items-center gap-2 mb-4`}>
                <Star className="w-4 h-4" />
                <h2 className="font-bold uppercase tracking-wider">
                  {section.level}
                </h2>
              </div>

              {/* MODULES */}
              <div className="grid md:grid-cols-2 gap-4">
                {section.modules.map((m, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={m.unlocked ? { scale: 1.04 } : {}}
                    onClick={() => m.unlocked && startProgress(m.path, m.id)}
                    className={`p-5 rounded-xl border relative transition
                    ${
                      m.unlocked
                        ? `bg-[#111827] ${theme.border} cursor-pointer hover:opacity-100`
                        : "bg-[#0F172A] border-gray-800 opacity-50 cursor-not-allowed"
                    }
                    `}
                  >
                    {/* STATUS ICON */}
                    <div className="absolute top-4 right-4">
                      {m.unlocked ? (
                        <Zap
                          className={`${theme.text} w-5 h-5 animate-pulse`}
                        />
                      ) : (
                        <Lock className="text-gray-500 w-5 h-5" />
                      )}
                    </div>

                    <h3
                      className={`${
                        m.unlocked ? `${theme.text}` : ""
                      } text-lg font-bold uppercase`}
                    >
                      {m.title}
                    </h3>
                    <p className="text-gray-200 text-sm mt-1">
                      {m.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <p
                        className={`w-fit p-1 text-xs mt-3 text-gray-200 rounded-lg bg-gradient-to-r ${theme.gradient} shadow-lg transition`}
                      >
                        {section.level}
                      </p>
                      <p
                        className={`w-fit p-1 text-xs font-black tracking-wide uppercase mt-3 shadow-lg transition`}
                      >
                        Challenges: {m.challenge}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CodeVisionFooter />
    </div>
  );
}
