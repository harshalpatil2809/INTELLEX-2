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
          <div className="h-full flex items-center justify-center">
            <div className="items-center flex flex-col gap-1">
              <img src="/logo.png" alt="logo" className="w-30 h-auto" />
              <div className="text-[#888] text-3xl">
                Meet <span className="font-mono font-bold text-white/80">INTELLEX</span>
              </div>
              <div className="text-[#888] text-md text-center">
                Your intelligent partner for brainstorming, coding, and creative
              solutions. <br /> How can I help you today?
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col items-center">
          {message.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex lg:w-3/5 md:w-3/4 w-full mb-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`prose max-w-[90%] text-white rounded-2xl px-4 py-2 text-md tracking-wide whitespace-pre-wrap wrap-break-word leading-snug ${
                  msg.role === "user" ? " bg-[#333] " : "  "
                }`}
              >
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
              </div>
            </div>
          ))}

          {loader && (
            <div className="flex lg:w-3/5 md:w-3/4 w-full mb-3 justify-start">
              <div className="max-w-[90%] text-white rounded-2xl px-4 py-2 text-md tracking-wide whitespace-pre-wrap wrap-break-word leading-snug">
                <Loader />
              </div>
            </div>
          )}
        </div>

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
