type Props = {
  theme?: {
    text?: string;
    border?: string;
  };
};

export default function CodeVisionFooter({ theme }: Props) {

  return (
    <div className="w-full border-t border-gray-800 mt-6 py-4 flex flex-col items-center text-[10px] text-gray-500">
      <div className="flex items-center gap-2">
        <span>Developer:</span>
        <span className="text-white font-semibold">JP QUINTANA</span>
      </div>

      <div className="text-[9px] mt-1">
        CodeVision v1.0 • OOP Learning Platform
      </div>
    </div>
  );
}
