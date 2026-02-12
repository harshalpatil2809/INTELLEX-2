import React, { useContext } from "react";
import { Send, SendHorizontal } from "lucide-react";
import axios from "axios";
import ChatContext from "../../context/ChatContext";
const Input = () => {
  const { setMessage, setLoader, text, setText } = useContext(ChatContext);

  const SendData = async (e) => {
    if (!text.trim()) return;

    if (e.key === "Enter" || e.type == "click") {
      e.preventDefault();

      setMessage((prev) => [...prev, { role: "user", text }]);

      try {
        setLoader(true);
        setText("");
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

        const responseData = response?.data?.output[1]?.content[0]?.text;
        setMessage((prev) => [...prev, { role: "bot", text: responseData }]);
        setLoader(false);
      } catch (error) {
        if (error.status === 401) {
          setMessage((prev) => [
            ...prev,
            { role: "bot", text: "API is not working... Please try again." },
          ]);
          setLoader(false);
        }
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full h-fit px-2 relative">
      <form
        onKeyDown={(e) => {
          e.preventDefault();
          SendData(e);
        }}
        className="flex justify-center items-center lg:gap-5 gap-2"
      >
        <textarea
          name="input"
          id="input"
          value={text}
          autoComplete="false"
          autoCorrect="false"
          spellCheck="false"
          placeholder="Start Chat"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="border-2 text-white outline-0 lg:w-1/2 md:w-3/4 w-full px-5 py-2 rounded-2xl placeholder-white placeholder:font-inter"
        ></textarea>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            SendData(e);
          }}
          className="hover:scale-115 duration-150 cursor-pointer"
          disabled={setLoader}
        >
          <SendHorizontal color="white" size={35} />
        </button>
      </form>
    </div>
  );
};

export default Input;
