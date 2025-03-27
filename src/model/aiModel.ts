/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
// "use client"

// import { GoogleGenerativeAI } from "@google/generative-ai";

//   const apiKey =  process.env.NEXT_PUBLIC_GEMNI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey!);
//     console.log(apiKey, 'at-model');

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

// //   async function run() {
//    export const chatSession = model.startChat({
//       generationConfig,
//    // safetySettings: Adjust safety settings
//    // See https://ai.google.dev/gemini-api/docs/safety-settings
//       history: [
//       ],
//     });

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
//   }

//   run();

import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_APIKEY, dangerouslyAllowBrowser:true});


export default openai;
// export async function getCompletion() {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content: "Write a haiku about recursion in programming.",
//       },
//     ],
//   });
//   console.log(completion.choices[0].message);
// }

// import Configuration, {OpenAI} from "openai";

// // Initialize OpenAI with API Key
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAI(configuration);