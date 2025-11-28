import { openAIClient } from "./openai";

export async function translate(text) {
  const response = await openAIClient.responses.create({
    model: "gpt-5-nano",
    input: `You are translating sentences from a  medical paper from Korean to English. Translate with a natural, academic tone. Do not add your own formatting or non-existent details. Simply return the translated output.
            Sentence:
            ${text} 
            `,
  });

  return response.output_text;
}

export async function retranslate(text, instruction) {
  const response = await openAIClient.responses.create({
    model: "gpt-5-nano",
    input: `The user does not like the initial translation. Retranslate according to the user's instruction.
              DO NOT include details about the instruction in the translated output. 
              DO NOT edit the original formatting.
              Only print out the retranslation.
                Instruction:
              ${instruction}
              
              Text to retranslate:
              ${text}
              `,
  });

  return response.output_text;
}
