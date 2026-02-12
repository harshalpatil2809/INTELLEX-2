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
        {/* Empty Message */}
        {message.length === 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
            {/*Logo */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center">
              <img src="/public/logo.png" alt="INTELLEX" />
            </div>
            {/* Hero Text */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Meet{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                INTELLEX
              </span>
            </h1>
            {/* Start message */}
            <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed mb-8">
              Your intelligent partner for brainstorming, coding, and creative
              solutions. How can I help you today?
            </p>
            <div className="mt-8 flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
              <span className="h-[1px] w-8 bg-gray-800"></span>
              Start a conversation
              <span className="h-[1px] w-8 bg-gray-800"></span>
            </div>
          </div>
        )}

        {/* User and Bot Messages */}
        <div className="flex flex-col w-full p-4 space-y-4">
          {message.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-white border border-gray-700 ${
                  msg.role === "user"
                    ? "rounded-tr-none bg-blue-600"
                    : "rounded-tl-none bg-gray-800"
                }`}
              >
                {/* Table */}
                <div className="prose prose-invert max-w-full overflow-x-auto text-md tracking-wide whitespace-pre-wrap break-words leading-snug">
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
                            className="rounded-lg my-2"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-black/30 px-1 rounded text-pink-400">
                            {children}
                          </code>
                        );
                      },
                      table({ children }) {
                        return (
                          <div className="max-w-full overflow-x-auto rounded-lg border border-gray-600 my-4">
                            <table className="w-full border-collapse text-sm">
                              {children}
                            </table>
                          </div>
                        );
                      },
                      th({ children }) {
                        return (
                          <th className="border border-gray-600 px-3 py-2 bg-gray-700 text-left font-bold">
                            {children}
                          </th>
                        );
                      },
                      td({ children }) {
                        return (
                          <td className="border border-gray-600 px-3 py-2">
                            {children}
                          </td>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Bot Loader */}
          {loader && (
            <div className="flex justify-start w-full mb-3">
              <Loader />
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="w-full pb-6 pt-3 ">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
