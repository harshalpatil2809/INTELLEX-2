import React, {  useState } from "react";
import { Send, SendHorizontal } from "lucide-react";
import axios from "axios";

const Input = () => {
  const [text, setText] = useState("");
  

  const Reload = (e) => {
    e.preventDefault();
  };
  const Typing = (e) => {
    setText(e.target.value);
  };

  // On Enter Send Data
  const SendData = (e) => {
    if (e.key === "Enter") {
      Data(text)
      console.log(text);
    }
  };

  const Data = async (text) => {
    try {
      console.log("Getting data....")
      const response = await axios.post(
        "https://api.groq.com/openai/v1/responses",
        {
          model: "openai/gpt-oss-120b",
          input: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
        }
      );
      const responseData = response.data.output[1].content[0].text
      console.log(responseData)
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  

  return (
    <div className="w-full h-fit px-2">
      <form
        method="POST"
        onSubmit={(e) => {
          Reload(e);
        }}
        onKeyDown={(e) => {
          SendData(e);
        }}
        className="flex justify-center items-center lg:gap-5 gap-2"
      >
        <input
          type="text"
          value={text}
          autoComplete="false"
          autoCorrect="false"
          spellCheck="false"
          placeholder="Start To Chat"
          onChange={Typing}
          className="border-2 text-white outline-0 lg:w-1/2 w-full px-5 py-2 rounded-2xl placeholder-white placeholder:font-mono"
        />
        <button type="submit" className="hover:scale-115">
          <SendHorizontal color="white" size={35} />
        </button>
      </form>
    </div>
  );
};

export default Input;
