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
          <div className="h-full flex items-center justify-center text-gray-400 text-4xl">
            Start a conversation 👋
          </div>
        )}

        {/* Messages */}
        {/* <div className="flex flex-col border w-full p-2 border-amber-300">
          {message.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex items-center mb-3 ${
                msg.role === "user" ? "justify-end border w-20 border-white" : "justify-start"
              }`}
            >
              <div
                className={`prose overflow-x-auto max-w-[90%] text-white rounded-2xl px-4 py-2 text-md tracking-wide whitespace-pre-wrap wrap-break-word leading-snug ${
                  msg.role === "user" ? "  " : "  "
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

                    table({ children }) {
                      return (
                        <div className="max-w-full overflow-auto rounded-lg border border-gray-700 my-4">
                          <table className="w-full border-collapse text-sm">
                            {children}
                          </table>
                        </div>
                      );
                    },

                    th({ children }) {
                      return (
                        <th className="border border-gray-700 px-3 py-2 bg-gray-800 text-left">
                          {children}
                        </th>
                      );
                    },

                    td({ children }) {
                      return (
                        <td className="border border-gray-700 px-3 py-2">
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
          ))}

          

          {loader && (
            <div className="flex lg:w-3/5 md:w-3/4 w-full mb-3 justify-start">
              <div className="max-w-[90%] text-white rounded-2xl px-4 py-2 text-md tracking-wide whitespace-pre-wrap wrap-break-word leading-snug">
                <Loader />
              </div>
            </div>
          )}
        </div> */}

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

          {/* Loader */}
          {loader && (
            <div className="flex justify-start w-full mb-3">
              <Loader />
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
