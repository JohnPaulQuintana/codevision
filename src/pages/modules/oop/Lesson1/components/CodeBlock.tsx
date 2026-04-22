import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { type Language } from "../../../../../types/language";
import Editor from "@monaco-editor/react";
type Props = {
  code: string;
  setCode?: (value: string) => void; // ✅ optional (only for quiz mode)

  language: Language;
  setLanguage: (lang: Language) => void;

  copyCode?: () => void;
  copied?: boolean;

  isMobile: boolean;
  theme: string;

  mode?: "view" | "edit"; // ✅ NEW
};

export default function CodeBlock({
  code,
  setCode,
  language,
  setLanguage,
  copyCode,
  copied,
  isMobile,
  theme,
  mode,
}: Props) {
  return (
    <div className="col-span-2 mt-4 bg-[#0F172A] border border-gray-800 rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-b border-gray-800">
        <p className={`text-sm ${theme} font-semibold uppercase`}>
          Live Generated Code
        </p>

        <div className="flex items-center gap-3">
          {/* LANGUAGE SELECT */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
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

          {/* COPY BUTTON */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition relative"
          >
            <motion.div
              initial={false}
              animate={
                copied ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }
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

      {/* CODE AREA */}
      <div className="w-full overflow-x-auto scrollbar-modern">
        {mode === "edit" && setCode ? (
          <Editor
            height="500px" // 👈 bigger editor
            language={language === "javascript" ? "javascript" : language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode?.(value || "")}
            options={{
              fontSize: isMobile ? 12 : 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        ) : (
          <SyntaxHighlighter
            language={language === "javascript" ? "js" : language}
            style={oneDark}
            showLineNumbers
            wrapLongLines={false}
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
                whiteSpace: "pre",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
