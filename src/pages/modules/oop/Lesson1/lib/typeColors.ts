export function getTypeColor(type: string) {
  switch (type) {
    case "electric":
      return "border-yellow-400 text-yellow-300";

    case "fire":
      return "border-red-400 text-red-300";

    case "water":
      return "border-blue-400 text-blue-300";

    case "grass":
      return "border-green-400 text-green-300";

    case "psychic":
      return "border-pink-400 text-pink-300";

    case "normal":
      return "border-gray-400 text-gray-300";

    case "ghost":
      return "border-purple-500 text-purple-300";

    case "dragon":
      return "border-indigo-500 text-indigo-300";

    case "fighting":
      return "border-orange-500 text-orange-300";

    default:
      return "border-gray-600 text-gray-300";
  }
}