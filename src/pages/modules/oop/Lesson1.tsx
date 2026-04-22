import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getPokemon } from "../../../lib/pokeapi";
import { Copy, Check, ArrowLeft } from "lucide-react";
import CodeVisionHeader from "../../../components/CodeVisionHeader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const POKEMON_LIST = [
  "pikachu",
  "charmander",
  "bulbasaur",
  "squirtle",
  "eevee",
  "jigglypuff",
  "meowth",
  "psyduck",
  "snorlax",
  "mew",
  "mewtwo",
  "gengar",
  "dragonite",
  "lapras",
  "magikarp",
  "alakazam",
  "charizard",
  "blastoise",
  "venusaur",
  "lucario",
];

// 🎨 BORDER ONLY TYPE SYSTEM
function getTypeColor(type: string) {
  switch (type) {
    case "electric":
      return "border-yellow-400 text-yellow-300";

    case "fire":
      return "border-red-400 text-red-300";

    case "water":
      return "border-blue-400 text-blue-300";

    case "grass":
      return "border-green-400 text-green-300";

    // 🧠 NEW TYPES
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

export default function Lesson1() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState<
    | "javascript"
    | "typescript"
    | "python"
    | "java"
    | "csharp"
    | "cpp"
    | "go"
    | "php"
  >("javascript");
  const [isMobile, setIsMobile] = useState(false);

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

  // 💻 GENERATED OOP CODE
  const generatedCode = useMemo(() => {
    if (!selected) return "";

    const name = selected.name;
    const type = selected.type;

    switch (language) {
      case "typescript":
        return `// Class definition: a blueprint for creating objects
class Pokemon {
  // Properties (attributes)
  name: string;
  type: string;

  // Constructor: runs when a new object is created
  constructor(name: string, type: string) {
    this.name = name; // assign value to object property
    this.type = type;
  }

  // Method: defines behavior of the object
  attack(): void {
    console.log(\`\${this.name} uses \${this.type} attack!\`);
  }
}

// Object creation (instance)
const ${name}: Pokemon = new Pokemon("${name}", "${type}");
`;

      case "python":
        return `# Class definition: blueprint for objects
class Pokemon:
    # Constructor: initializes object properties
    def __init__(self, name, type):
        self.name = name  # attribute
        self.type = type

    # Method: behavior of the object
    def attack(self):
        print(f"{name} uses {type} attack!")

# Object creation (instance)
${name} = Pokemon("${name}", "${type}")
`;

      case "java":
        return `// Class definition: blueprint for objects
class Pokemon {
    // Attributes (properties)
    String name;
    String type;

    // Constructor: initializes object
    Pokemon(String name, String type) {
        this.name = name;
        this.type = type;
    }

    // Method: behavior of the object
    void attack() {
        System.out.println(name + " uses " + type + " attack!");
    }
}

// Object creation (instance)
Pokemon ${name} = new Pokemon("${name}", "${type}");
`;

      case "csharp":
        return `// Class definition
class Pokemon {
    public string Name;
    public string Type;

    public Pokemon(string name, string type) {
        Name = name;
        Type = type;
    }

    public void Attack() {
        Console.WriteLine($"{name} uses {type} attack!");
    }
}

// Object creation
Pokemon ${name} = new Pokemon("${name}", "${type}");
`;

      case "cpp":
        return `#include <iostream>
using namespace std;

// Class definition
class Pokemon {
public:
    string name;
    string type;

    Pokemon(string n, string t) {
        name = n;
        type = t;
    }

    void attack() {
        cout << name << " uses " << type << " attack!" << endl;
    }
};

// Object creation
int main() {
    Pokemon ${name}("${name}", "${type}");
}
`;

      case "go":
        return `package main
import "fmt"

// Struct instead of class
type Pokemon struct {
    Name string
    Type string
}

// Method
func (p Pokemon) Attack() {
    fmt.Println(p.Name + " uses " + p.Type + " attack!")
}

func main() {
    ${name} := Pokemon{Name: "${name}", Type: "${type}"}
    ${name}.Attack()
}
`;

      case "php":
        return `<?php
// Class definition
class Pokemon {
    public $name;
    public $type;

    function __construct($name, $type) {
        $this->name = $name;
        $this->type = $type;
    }

    function attack() {
        echo $this->name . " uses " . $this->type . " attack!";
    }
}

// Object creation
$${name} = new Pokemon("${name}", "${type}");
?>`;

      default:
        return `// Class definition
class Pokemon {
  // Constructor
  constructor(name, type) {
    this.name = "${name}"; // attribute
    this.type = "${type}";
  }

  // Method
  attack() {
    console.log("${name} uses ${type} attack!");
  }
}

// Object creation
const ${name} = new Pokemon("${name}", "${type}");
`;
    }
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
            {visiblePokemons.map((p, i) => {
              const typeStyle = getTypeColor(p.type);
              const isActive = selected?.name === p.name;

              return (
                <motion.div
                  key={i}
                  onClick={() => {
                    setSelected(p);
                    setExpanded(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`
                  flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition relative
                  
                  ${
                    isActive
                      ? `${typeStyle}`
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
          </div>

          {/* 📱 FLOATING CHEVRON BUTTON */}
          <div className="md:hidden absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`
              w-10 h-10 flex items-center justify-center rounded-full 
               bg-[#111827] border ${theme} 
               text-gray-300 hover:text-white hover:border-gray-500 
               shadow-lg transition`}
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.div>
            </button>
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
            {/* LIVE OBJECT */}
            {selected && (
              <motion.div
                className={`w-full mt-4 p-6 rounded-xl border ${theme} bg-[#111827]`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-gray-400 text-sm">Active Object Instance</p>

                <div className="flex flex-col items-center gap-5 mt-3">
                  <img src={selected.sprite} className="w-full" />

                  <div>
                    <p className="text-2xl font-bold capitalize">
                      {selected.name}
                    </p>
                    <p className="text-gray-300">
                      Type: <span className={theme}>{selected.type}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 💻 CODE BLOCK */}
            <div className="col-span-2 w-full mt-4 bg-[#0F172A] border border-gray-800 rounded-xl overflow-hidden">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-b border-gray-800">
                <p className={`text-sm ${theme} font-semibold uppercase`}>
                  Live Generated Code
                </p>

                <div className="flex items-center justify-between gap-3">
                  {/* LEFT: SELECT */}
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-[#0B0F1A] border border-gray-700 text-gray-300 text-xs px-3 py-2 rounded-md outline-none"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="go">Go</option>
                    <option value="php">PHP</option>
                  </select>

                  {/* RIGHT: COPY BUTTON */}
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition relative"
                  >
                    <motion.div
                      initial={false}
                      animate={
                        copied
                          ? { scale: 1.2, rotate: 10 }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </motion.div>

                    <motion.span
                      key={copied ? "copied" : "copy"}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={copied ? "text-green-400" : ""}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </motion.span>

                    {copied && (
                      <motion.div
                        className="absolute inset-0 rounded-md bg-green-500/10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* CODE */}
              <div className="w-full overflow-x-auto scrollbar-modern">
                <SyntaxHighlighter
                  language={language === "javascript" ? "js" : language}
                  style={oneDark}
                  showLineNumbers={true}
                  wrapLongLines={false} // ❌ IMPORTANT: turn this OFF
                  customStyle={{
                    margin: 0,
                    padding: isMobile ? "12px" : "16px",
                    background: "#0F172A",
                    fontSize: isMobile ? "11px" : "13px",
                    overflowX: "auto",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "monospace",
                      whiteSpace: "pre", // ✅ preserve formatting
                    },
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  );
}
