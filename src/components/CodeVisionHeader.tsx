import React from "react";

type Props = {
  theme?: {
    text?: string;
    border?: string;
  };
};

export default function CodeVisionHeader({ theme }: Props) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 p-4 bg-[#0B0F1A]">
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        {/* animated dot logo */}
        {/* <div
          className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse ${
            theme?.border || ""
          }`}
        /> */}

        <h1
          className={`text-lg md:text-xl font-black tracking-widest ${
            theme?.text || "text-white"
          }`}
        >
          CODEVISION
        </h1>
      </div>

      {/* RIGHT - TAG */}
      <span className="text-[10px] text-gray-500 border border-gray-700 px-2 py-1 rounded-md">
        OOP LEARNER
      </span>
    </div>
  );
}