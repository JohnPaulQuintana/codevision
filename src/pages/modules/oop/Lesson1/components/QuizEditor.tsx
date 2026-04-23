import Editor from "@monaco-editor/react";
import { type Language } from "../../../../../types/language";

type Props = {
  code: string;
  setCode: (v: string) => void;
  language: Language;
  setLanguage: (v: Language) => void;
  theme: string;
  isMobile: boolean;

  // NEW 👇
  onRun?: () => void;
};

export default function QuizEditor({
  code,
  // setCode,
  language,
  setLanguage,
  theme,
  isMobile,
  // onRun,
}: Props) {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden border border-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#0B0F1A] border-b border-gray-800">
        <p className={`text-sm font-bold uppercase ${theme}`}>
          Pokémon Code Editor
        </p>

        <div className="flex items-center gap-2">
          {/* LANGUAGE SELECT */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-[#111827] text-xs text-white px-2 py-1 rounded"
          >
            <option value="javascript">JAVASCRIPT</option>
            {/* <option value="typescript">TS - Not Supported</option>
            <option value="python">Py - Not Supported</option>
            <option value="java">Java - Not Supported</option>
            <option value="csharp">C# - Not Supported</option> */}
          </select>

          {/* RUN BUTTON 🔥 */}
          {/* <button
            onClick={onRun}
            className={`${theme} text-xs px-3 py-1 rounded font-semibold transition`}
          >
            Run Code
          </button> */}
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onMount={(editor) => {
            editor.updateOptions({
              readOnly: true, // 🔒 LOCK EDITOR
            });
          }}
          options={{
            fontSize: isMobile ? 12 : 15,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 2,
            formatOnType: false,
            formatOnPaste: false,
          }}
        />
      </div>
    </div>
  );
}
