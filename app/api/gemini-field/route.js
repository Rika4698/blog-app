export async function POST(request) {
  try {
    const { type, topic } = await request.json();


    const promptMap = {
      title: `Generate a blog title (max 6 words, no punctuation or quotes or special case) based on this topic: "${topic}"`,
      description: `Write a short description (max 230 characters) for a blog on: "${topic}"`,
      conclusion: `Write a strong, engaging conclusion (max 40 words)  for a blog about: "${topic}"`,
    };

    const prompt = promptMap[type];
    

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini Response:", data);

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(JSON.stringify({ result: result.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API error:", error); // Log full error
    return new Response(
      JSON.stringify({ error: "Gemini API call failed", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
