import { fetchWithAuth } from "../apiClient.js";

// generate AI response
export const generateAiResponse = async (data) => {
  return await fetchWithAuth("/ai/template/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// payload for generateAiResponse
// {
//     "userPrompt": "for bajarang company for fruites 10% off",
//     "style": "Funny",  // "Normal", "Poetic", "Exciting", "Funny", "Grammatical"
//     "optimizeFor": "Reply Rate", //"Click Rate", "Reply Rate"
//     "language": "English" //  English,Hindi,Spanish,French,German,Arabic,Marathi,Gujarati,Tamil,Telugu
// }