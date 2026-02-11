import { useContext, useEffect, useRef } from "react";
import Input from "../Input/Input.jsx";
import { Loader } from "../Loader/Loader.jsx";
import ChatContext from "../../context/ChatContext.js";
import ReactMarkdown from "react-markdown";


const Chat = () => {
  const { message = [], loader } = useContext(ChatContext);
  const bottomRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, loader]);

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-3">

        {/* Empty State */}
        {message.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 text-4xl">
            Start a conversation 👋
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col items-center">
          {message.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex lg:w-1/2 md:w-3/4 w-full mb-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] text-white rounded-2xl px-4 py-2 text-md tracking-wide whitespace-pre-wrap wrap-break-word leading-snug ${
                  msg.role === "user"
                    ? "  "
                    : "  "
                }`}
              >
                <ReactMarkdown >
                {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Loader */}
        {loader && (
          <div className="flex justify-center items-center mt-4">
            <Loader />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="w-full pb-6 pt-3 ">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
