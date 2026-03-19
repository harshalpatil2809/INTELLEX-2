import React, { useContext, useState } from "react";
import { SendHorizontal, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import ChatContext from "../../context/ChatContext";

const Input = () => {
  const { setMessage, setLoader, text, setText, loader } =
    useContext(ChatContext);

  const [mode, setMode] = useState("chat"); 

  const SendData = async (e) => {
    if (!text.trim() || loader) return;

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      setMessage((prev) => [...prev, { role: "user", text }]);
      setText("");
      setLoader(true);

      try {
        if (mode === "chat") {
          // TEXT AI
          const res = await axios.post(
            "https://api.groq.com/openai/v1/responses",
            {
              model: "openai/gpt-oss-120b",
              input: text,
            },
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
              },
            }
          );

          const reply = res?.data?.output[1]?.content[0]?.text;

          setMessage((prev) => [
            ...prev,
            { role: "bot", text: reply, type: "text" },
          ]);
        } else {
          // IMAGE GENERATION (example using Pollinations)
          const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
            text
          )}`;

          setMessage((prev) => [
            ...prev,
            { role: "bot", text: imgUrl, type: "image" },
          ]);
        }
      } catch (err) {
        setMessage((prev) => [
          ...prev,
          { role: "bot", text: "⚠️ Error occurred" },
        ]);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="w-full px-2">
      <form
        onKeyDown={SendData}
        className="flex items-center justify-center gap-2"
      >
        

        {/* INPUT */}
        <textarea
          value={text}
          placeholder={
            mode === "chat"
              ? "Ask anything..."
              : "Describe image to generate..."
          }
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl outline-none resize-none"
        />

        {/* SEND */}
        <button
          type="button"
          onClick={SendData}
          disabled={loader}
          className="bg-blue-600 hover:scale-110 transition px-3 py-2 rounded-xl"
        >
          <SendHorizontal color="white" size={20} />
        </button>
      </form>
    </div>
  );
};

export default Input;