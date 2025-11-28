import { openAIClient } from "./openai";
import { performance } from "node:perf_hooks";

export async function translate(text) {
  const start = performance.now();
  const response = await openAIClient.responses.create({
    model: "gpt-4.1-mini",
    instructions: `You are a helpful assistant that translates text to English. Translate with a natural, academic tone. Do not add your own formatting or non-existent details. Simply return the translated output.`,
    input: `${text}`,
  });
  const duration = performance.now() - start;
  console.log("OpenAI latency:", duration.toFixed(2), "ms");

  return response.output_text;
}

export async function retranslate(text, instruction) {
  const response = await openAIClient.responses.create({
    model: "gpt-4.1-mini",
    instructions: `You are a helpful assistant that retranslates text to English based on user instructions.   DO NOT include details about the instruction in the translated output. 
              DO NOT edit the original formatting.
              Only print out the retranslation.`,
    input: ` 
              User Instruction:
              ${instruction}
              
              Text to retranslate:
              ${text}
              `,
  });

  return response.output_text;
}
