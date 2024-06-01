import axios from "axios";
import { useState } from "react";

const GptPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const query = "Act as an Ecommerce suggestor, so people could ask suggestions from you about products, keep your answer in between 40 words or maximum 60 words. " + question

  async function generateAns() {
    setAnswer("Loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAOSbkVGDa4GAKdnSwM7qIwbuDPA7mtFKw",
      method: "post",
      data: { contents: [{ parts: [{ text: query }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <div className="p-32">
      <h1 className="text-white">Your AI</h1>
      <input 
      className="w-96"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}

     / > 
     <br />
      <button className="text-xl rounded-full px-6 py-2 text-white bg-teal-900" onClick={generateAns}>
        Get answer
      </button>
      <pre className="text-black bg-red-300 p-12"> {answer}</pre>
    </div>
  );
};

export default GptPage;
