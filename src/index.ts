import express from "express";
import cors from "cors";
import { retranslate, translate } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/translate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "Text is required for translation." });
    return;
  }

  try {
    res.json({
      translation: await translate(text),
    });
  } catch (error) {
    console.error("Error translating the text:", error);
  }
});

app.post("/api/retranslate", async (req, res) => {
  const { text, instruction } = req.body;

  if (!text || !instruction) {
    res
      .status(400)
      .json({ error: "Text and instruction are required for retranslation." });
    return;
  }

  try {
    res.json({
      translation: await retranslate(text, instruction),
    });
  } catch (error) {
    console.error("Error retranslating the text.");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000..");
});
