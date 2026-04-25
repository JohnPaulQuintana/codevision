import {
  Trophy,
  Crown,
  Medal,
  Star,
  ArrowUp,
  Bell,
  Zap,
  Swords,
  // Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import CodeVisionHeader from "../components/CodeVisionHeader";
import { useEffect, useState } from "react";
import { api } from "../auth/api";
import CodeVisionFooter from "../components/Footer";

/* 🎭 AVATAR */
const getAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`;

/* 🧠 RANK */
// function getRank(xp: number) {
//   if (xp >= 3000) return "Elite";
//   if (xp >= 2000) return "Advanced";
//   return "Beginner";
// }

// /* 🧠 STAGE */
// function getStageStyle(stage: string) {
//   switch (stage) {
//     case "Inheritance":
//       return "text-purple-300 bg-purple-500/10 border-purple-400/30";
//     case "Polymorphism":
//       return "text-pink-300 bg-pink-500/10 border-pink-400/30";
//     case "Encapsulation":
//       return "text-green-300 bg-green-500/10 border-green-400/30";
//     case "Objects & Classes":
//       return "text-blue-300 bg-blue-500/10 border-blue-400/30";
//     case "Constructor":
//       return "text-cyan-300 bg-cyan-500/10 border-cyan-400/30";
//     default:
//       return "text-gray-300 bg-gray-500/10 border-gray-400/30";
//   }
// }

/* 🧠 RANK STYLE */
function getRankStyle(rank: string) {
  switch (rank) {
    case "Elite":
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-400/30",
        glow: "shadow-[0_0_30px_rgba(250,204,21,0.25)]",
        icon: "text-yellow-400",
      };
    case "Advanced":
      return {
        bg: "bg-blue-500/10",
        border: "border-blue-400/30",
        glow: "",
        icon: "text-blue-400",
      };
    default:
      return {
        bg: "bg-green-500/10",
        border: "border-green-400/30",
        glow: "",
        icon: "text-green-400",
      };
  }
}

/* DATA */
// const PLAYERS = [
//   { name: "Ash", xp: 3200, position: 1, stage: "Inheritance" },
//   { name: "Misty", xp: 2800, position: 2, stage: "Polymorphism" },
//   { name: "Brock", xp: 2500, position: 3, stage: "Encapsulation" },
//   { name: "Gary", xp: 2100, position: 4, stage: "Objects & Classes" },
//   { name: "You", xp: 1800, position: 5, stage: "Constructor" },
// ].map((p) => ({ ...p, rank: getRank(p.xp) }));

/* ANNOUNCEMENTS */
const ANNOUNCEMENTS = [
  { title: "New OOP Challenges", desc: "Inheritance challenge unlocked" },
  { title: "XP Event Active", desc: "+50% XP until weekend" },
  { title: "Season Reset Soon", desc: "Leaderboard resets in 7 days" },
];

export default function RankingPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(loading)
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await api("/ranking/status");
        if (res.ok) {
          setPlayers(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 md:px-20 w-full">
      <CodeVisionHeader />

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-4xl font-black tracking-widest bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            TRAINER HUB
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Battle your way through OOP stages
          </p>
        </div>

        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <Trophy className="w-4 h-4" />
          Featured
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ================= LEFT: RANKING ================= */}
        <div className="md:col-span-2 space-y-6 rounded-md">
          {/* PODIUM */}
          <div className="flex gap-3 overflow-x-auto scrollbar-modern md:grid md:grid-cols-3 md:overflow-x-visible pb-2">
            {players.slice(0, 3).map((p, i) => {
              const style = getRankStyle(p.rank);

              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`min-w-[160px] md:min-w-0 rounded-xl border p-4 text-center ${style.bg} ${style.border}`}
                >
                  {i === 0 && (
                    <Crown className="mx-auto text-yellow-400 mb-1" />
                  )}
                  {i === 1 && <Medal className="mx-auto text-gray-300 mb-1" />}
                  {i === 2 && (
                    <Medal className="mx-auto text-orange-400 mb-1" />
                  )}

                  <img
                    src={getAvatar(p.name)}
                    className="w-12 h-12 mx-auto rounded-full mb-2 border border-gray-700"
                  />

                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="flex flex-wrap gap-1 mt-1 justify-center">
                    {(() => {
                      const stages = p.stage
                        .split(",")
                        .map((s: string) => s.trim());

                      const lastStage = stages[stages.length - 1];
                      const remaining = stages.length - 1;

                      return (
                        <>
                          {/* latest stage */}
                          <span className="text-[9px] px-2 py-[2px] rounded-full border border-gray-700 bg-black/20 text-gray-300">
                            {lastStage}
                          </span>

                          {/* older stages count */}
                          {remaining > 0 && (
                            <span className="text-[9px] px-2 py-[2px] rounded-full border border-gray-600 bg-gray-800 text-gray-300">
                              +{remaining}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="text-xs mt-1 font-bold">{p.xp} XP</div>
                </motion.div>
              );
            })}
          </div>

          {/* 🔥 SECTION DIVIDER */}
          <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
            <Swords className="w-4 h-4 text-blue-400" />
            Global Ranking
            <div className="flex-1 h-px bg-gray-800 ml-2" />
          </div>

          {/* LIST */}
          <div className="space-y-2">
            {players.map((p, i) => {
              const style = getRankStyle(p.rank);
              const isYou = p.name === "You";
              const next = players[i - 1];
              const gap = next ? next.xp - p.xp : 0;

              return (
                <div
                  key={p.name}
                  className={`flex items-center justify-between p-4 rounded-xl border ${style.border} ${style.bg}
                  ${isYou ? "ring-1 ring-blue-400" : ""}`}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-5">
                      #{p.position}
                    </span>

                    <img
                      src={getAvatar(p.name)}
                      className="w-10 h-10 rounded-full border border-gray-700"
                    />

                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        {p.name}
                        {isYou && (
                          <span className="text-[10px] text-blue-400">
                            (You)
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1 justify-start">
                        {p.stage
                          .split(",")
                          .slice(0, 2)
                          .map((s: string, i: number) => (
                            <span
                              key={i}
                              className="text-[9px] px-2 py-[2px] rounded-full border border-gray-700 bg-black/20 text-gray-300"
                            >
                              {s.trim()}
                            </span>
                          ))}

                        {p.stage.split(",").length > 2 && (
                          <span className="text-[9px] px-2 py-[2px] rounded-full border border-gray-600 bg-gray-800 text-gray-300">
                            +{p.stage.split(",").length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <div className="font-bold flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {p.xp}
                    </div>

                    {gap > 0 && (
                      <div className="text-[10px] text-gray-500 flex items-center gap-1 justify-end">
                        <ArrowUp className="w-3 h-3" />+{gap}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT: PANEL ================= */}
        <div className="space-y-6">
          {/* ANNOUNCEMENTS */}
          <div>
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-3">
              <Bell className="w-4 h-4" />
              OOP Updates
            </div>

            <div className="space-y-3">
              {ANNOUNCEMENTS.map((a, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-800 bg-[#111827]/60"
                >
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {a.title}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <div>
            <div className="text-yellow-400 text-sm font-bold mb-3">
              Featured OOP Trainers
            </div>

            <div className="space-y-2">
              {players.slice(0, 3).map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition"
                >
                  <img
                    src={getAvatar(p.name)}
                    className="w-9 h-9 rounded-full border border-gray-700"
                  />
                  <div className="text-xs">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-gray-500">{p.rank}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <CodeVisionFooter/>
    </div>
  );
}
