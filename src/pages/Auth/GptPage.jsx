import axios from "axios";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const GptPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const query =
    "Act as an Ecommerce suggestor, so people could ask suggestions from you about products, keep your answer in between 40 words or maximum 60 words. " +
    question;

  async function generateAns() {
    setAnswer(
      <div class="flex flex-row justify-center gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${" AIzaSyCFFsmKrjtnDGUbub-mYh4HS19omqBLu2k"}`,
      method: "post",
      data: { contents: [{ parts: [{ text: query }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <div className="px-32 text-center w-full h-[32rem] flex flex-col items-center justify-between">
      <h1 className="text-black text-6xl">Your AI</h1>

      {answer ? (
        <p className="text-black w-[50rem] text-center text-lg  rounded-lg p-8 mt-4">
          {answer}
        </p>
      ) : (
        ""
      )}

      <div className="flex items-center mt-[4rem]">
        <input
          className="px-5 py-2 border-none outline-none rounded-2xl w-[45rem]"
          value={question}
          placeholder="Ask anything..."
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="text-xl rounded-full px-2.5 py-2.5 ml-2 text-white bg-black"
          onClick={generateAns}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default GptPage;
