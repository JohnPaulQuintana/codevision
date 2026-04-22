import { motion } from "framer-motion";
import { getTypeColor } from "../lib/typeColors";

type Pokemon = {
  name: string;
  type: string;
  sprite: string;
};

type Props = {
  pokemons: Pokemon[];
  selected: Pokemon | null;
  setSelected: (p: Pokemon) => void;
  setExpanded?: (v: boolean) => void;
  visibleOnly?: boolean;
};

export default function PokemonList({
  pokemons,
  selected,
  setSelected,
  setExpanded,
}: Props) {
  return (
    <>
      {pokemons.map((p, i) => {
        const typeStyle = getTypeColor(p.type);
        const isActive = selected?.name === p.name;

        return (
          <motion.div
            key={i}
            onClick={() => {
              setSelected(p);
              setExpanded?.(false);
            }}
            whileHover={{ scale: 1.02 }}
            className={`
              flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition relative
              ${
                isActive
                  ? typeStyle
                  : "border-gray-800 hover:border-gray-600"
              }
            `}
          >
            <img src={p.sprite} className="w-11 h-11 drop-shadow" />

            <div>
              <p className="capitalize font-bold">{p.name}</p>
              <p className="text-xs text-gray-400">{p.type}</p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}