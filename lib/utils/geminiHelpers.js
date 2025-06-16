export const generateGeminiField = async (type, topic) => {
  const res = await fetch("/api/gemini-field", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, topic }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("API Error:", data);
    throw new Error(data.error || "Generation failed");
  }

  return data.result;
};
