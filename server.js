import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "AI Student Doubt Solver is running." });
});

app.post("/api/solve", async (req, res) => {
  try {
    const { doubt, subject = "General", language = "English" } = req.body;

    if (!doubt || !doubt.trim()) {
      return res.status(400).json({ error: "Please enter your doubt." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Add it to your .env file."
      });
    }

    const prompt = `
You are an educational AI assistant for college students.
Subject: ${subject}
Answer language: ${language}

Student doubt:
${doubt.trim()}

Give a clear, accurate, beginner-friendly answer.
Use this structure when appropriate:
1. Short Answer
2. Explanation
3. Example
4. Key Points

If code is useful, provide a small correct example and explain it.
Do not invent facts. If the question is ambiguous, state the assumption you made.
Keep the answer focused on learning.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "AI service returned an error."
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return res.status(502).json({ error: "The AI returned an empty answer." });
    }

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

app.get("*splat", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`AI Student Doubt Solver running at http://localhost:${PORT}`);
});
