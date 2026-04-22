import { motion } from "framer-motion";

type Props = {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  theme: string;
};

export default function ExpandToggleButton({
  expanded,
  setExpanded,
  theme,
}: Props) {
  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`
        w-10 h-10 flex items-center justify-center rounded-full 
        bg-[#111827] border ${theme} 
        text-gray-300 hover:text-white hover:border-gray-500 
        shadow-lg transition
      `}
    >
      <motion.div
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        ▼
      </motion.div>
    </button>
  );
}