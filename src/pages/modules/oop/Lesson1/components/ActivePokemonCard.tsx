import { motion } from "framer-motion";

type Pokemon = {
  name: string;
  type: string;
  sprite: string;
};

type Props = {
  pokemon: Pokemon | null;
  theme: string;
};

export default function ActivePokemonCard({ pokemon, theme }: Props) {
  if (!pokemon) return null;

  return (
    <motion.div
      className={`w-full mt-4 p-6 rounded-xl border ${theme} bg-[#111827]`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-gray-400 text-sm">Active Object Instance</p>

      <div className="flex flex-col items-center gap-5 mt-3">
        <img src={pokemon.sprite} className="w-full" />

        <div>
          <p className="text-gray-300 text-2xl font-bold capitalize">
            Name: <span className={theme}>{pokemon.name}</span>
          </p>
          <p className="text-gray-300">
            Type: <span className={theme}>{pokemon.type}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}