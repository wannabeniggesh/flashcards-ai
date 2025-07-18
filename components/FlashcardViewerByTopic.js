import FlipCard from "./FlipCard";

export default function FlashcardViewerByTopic({ topics }) {
  return (
    <div className="grid gap-8">
      {topics.map((topic, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topic.flashcards.map((card, idx) => (
              <FlipCard key={idx} front={card.front} back={card.back} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
