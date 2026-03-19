import { useContext, useEffect, useRef } from "react";
import Input from "../Input/Input.jsx";
import { Loader } from "../Loader/Loader.jsx";
import ChatContext from "../../context/ChatContext.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chat = () => {
  const { message = [], loader } = useContext(ChatContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, loader]);

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden bg-linear-to-b from-[#0f0f0f] to-[#272727] lg:px-20 md:px-20 px-0">
      
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        
        {/* Empty State */}
        {message.length === 0 && (
          <div className="h-full flex items-center justify-center text-center">
            <div className="flex flex-col gap-2">
              <img src="/logo.png" alt="logo" className="w-24 mx-auto" />
              <h1 className="text-3xl text-white font-bold">INTELLEX</h1>
              <p className="text-gray-400">
                AI for coding, ideas & creativity 🚀
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col items-center gap-3">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full lg:w-3/5 md:w-3/4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm backdrop-blur-md border text-white ${
                  msg.role === "user"
                    ? "bg-blue-600/20 border-blue-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {/* TEXT MESSAGE */}
                {msg.type !== "image" && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-800 px-1 rounded">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}

                {/* IMAGE MESSAGE */}
                {msg.type === "image" && (
                  <img
                    src={msg.text}
                    alt="generated"
                    className="rounded-xl max-h-80"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Loader */}
          {loader && (
            <div className="flex w-full lg:w-3/5 md:w-3/4 justify-start">
                <Loader />
            </div>
          )}
        </div>

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="w-full pb-6 pt-3">
        <Input />
      </div>
    </div>
  );
};

export default Chat;