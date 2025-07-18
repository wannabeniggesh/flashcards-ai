export default async function handler(req, res) {
  const { inputText } = req.body;
  const apiKey = process.env.DEEPSEEK_API_KEY;

  const messages = [
    {
      role: "system",
      content: "You are an educational assistant generating clean flashcard data."
    },
    {
      role: "user",
      content: `Create flashcards for this topic:
${inputText}
Output JSON with 'topics' array. Each topic has title + flashcards (front, back).`
    }
  ];

  try {
    const completion = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7
      })
    });

    const data = await completion.json();
    const jsonStart = data.choices[0].message.content.indexOf("{");
    const json = JSON.parse(data.choices[0].message.content.slice(jsonStart));

    res.status(200).json(json);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Failed to generate flashcards." });
  }
}
