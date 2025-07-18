import { useState, useRef } from "react";
import FlashcardViewerByTopic from "../components/FlashcardViewerByTopic";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({ content: () => printRef.current });

  const fetchFlashcards = async (inputText) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/generate", { inputText });
      setTopics(response.data.topics);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">✈️ AI Flashcard Generator</h1>

      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        <textarea
          placeholder="Enter topic or paste paragraph..."
          className="p-3 rounded border bg-white dark:bg-gray-800 text-black dark:text-white"
          rows={4}
          onBlur={(e) => fetchFlashcards(e.target.value)}
        />
        {loading && <p className="text-center">⏳ Generating flashcards...</p>}
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          🖨️ Print Flashcards
        </button>
      </div>

      <div ref={printRef} className="mt-6">
        <FlashcardViewerByTopic topics={topics} />
      </div>
    </div>
  );
}
