import { GoogleGenerativeAI } from "@google/generative-ai";

  // // do NOT leave api key when pushing to github
  // const genAI = new GoogleGenerativeAI("");
  // const model = genAI.getGenerativeModel({
  //   model: "gemini-1.5-flash",
  //   systemInstruction: "Answer the question in 150 words or less."
  // });

  // const makeQuery = async () => {
  //   try {
  //     const prompt = enteredPrompt + ": " + selectedText;

  //     const result = await model.generateContent(prompt);
  //     setResponse(result.response.text());

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

// Number of responses to return
export var candidateCount = 1;
// Randomness of output, higher values are more creative (0.0->2.0)
export var temperature = 1.0;
// Rough Word Count
export var wordCount = 150;
// Specific instructions to gemini
var systemInstruction = ()=>{return "Answer the question in around"+wordCount+"words";}

export function updateValues(cc, temp, wc){
    candidateCount = cc;
    temperature = temp;
    wordCount = wc;
}