import React, { useState } from "react";
import { Send, SendHorizontal } from "lucide-react";
import axios from "axios";


const Input = ({ setMessage }) => {
  const [text, setText] = useState("");

  const SendData = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      setMessage((prev) => [...prev, `You: ${text}`]);

      try {
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

        const responseData = response.data.output[1].content[0].text;

        // 2️⃣ API ka response bhejo
        setMessage((prev) => [...prev, `Bot: ${responseData}`]);
        setText("");
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className="w-full h-fit px-2">
      <form
        method="POST"
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
          onChange={(e)=>{setText(e.target.value)}}
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
