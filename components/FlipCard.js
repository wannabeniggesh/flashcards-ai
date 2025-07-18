import { useState } from "react";

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer w-full h-48 perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={\`relative w-full h-full transition-transform duration-500 transform \${flipped ? "rotate-y-180" : ""}\`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden border rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white shadow-md p-4 flex items-center justify-center text-center text-sm sm:text-base">
          {front}
        </div>
        <div
          className="absolute w-full h-full backface-hidden border rounded-xl bg-blue-50 dark:bg-gray-700 text-black dark:text-white shadow-md p-4 flex items-center justify-center text-center text-sm sm:text-base transform rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
