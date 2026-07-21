import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./groqClient.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("✅ SmartReq AI Backend is Running!");
});

app.post("/analyze", async (req, res) => {

  console.log("🔥 /analyze route reached");

  try {

    const { requirement } = req.body;

    console.log("Requirement:", requirement);

    

    const response = await client.chat.completions.create({

      model: process.env.MODEL,

      messages: [
        {
          role: "system",
          content: `
You are an expert Software Requirements Engineer specializing in IoT and Smart Home systems.

Your primary task is to summarize unstructured IoT and Smart Home requirements into a concise, well-organized software requirement summary.

The summary should preserve all important information while presenting it in a professional format suitable for Software Engineering documentation.

After generating the executive summary, organize the remaining information into functional requirements, non-functional requirements, detected IoT devices, sensors, missing requirements, potential risks, and improvement suggestions.
git rm -r --cached backend/node_modules

Before generating the summary, determine whether the user's input is genuinely related to an IoT or Smart Home system.

If the input is NOT related to IoT or Smart Home requirements, do NOT generate a summary.

Instead, return ONLY this JSON:

{
  "error": "This application only supports IoT and Smart Home requirement summarization. Please enter a valid IoT or Smart Home requirement."
}

Only generate the normal JSON response if the input is clearly related to IoT or Smart Home systems.
Return ONLY valid JSON using exactly this structure:

{
  "summary": "",
  "functionalRequirements": [],
  "nonFunctionalRequirements": [],
  "iotDevices": [],
  "sensors": [],
  "missingRequirements": [],
  "risks": [],
  "suggestions": []
}

Instructions:

- Write an executive summary of 3–5 professional sentences.
- The executive summary should explain:
  - the purpose of the IoT system,
  - the main functionality requested by the user,
  - the key IoT devices and sensors involved,
  - and the overall objective of the proposed solution.
- Keep the summary concise, clear, and suitable for a Software Requirements Specification.

- Extract all functional requirements from the user's input.
- Extract all non-functional requirements that are explicitly stated or reasonably implied.
- Identify every IoT device mentioned.
- Identify every sensor mentioned.
- List important missing requirements that should be clarified.
- Identify possible implementation, security, or reliability risks.
- Suggest practical improvements to make the requirement more complete.

Rules:

- Use professional Software Engineering terminology.
- Do not invent unrealistic features or devices.
- If information is missing, list it under "missingRequirements" instead of guessing.
- Do not return Markdown.
- Do not include \`\`\`json.
- Return ONLY the JSON object.
`,
        },
        {
          role: "user",
          content: requirement,
        },
      ],

    });

    console.log("✅ Groq responded");

    const aiResponse = response.choices[0].message.content;

    res.json({
      result: aiResponse,
    });

  } catch (error) {

    console.error("❌ Full Error:");
    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }

});

console.log("MODEL:", process.env.MODEL);
console.log("API Key exists:", !!process.env.GROQ_API_KEY);

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
});