// components/FlipCard.js
import { useState } from "react";

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-full h-48 perspective cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4 backface-hidden">
          <p className="text-lg font-semibold">{front}</p>
        </div>
        <div className="absolute w-full h-full bg-blue-600 text-white rounded-lg shadow-md p-4 transform rotate-y-180 backface-hidden">
          <p className="text-lg">{back}</p>
        </div>
      </div>
    </div>
  );
}
