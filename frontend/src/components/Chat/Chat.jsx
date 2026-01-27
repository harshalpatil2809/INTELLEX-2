import Input from "../Input/Input.jsx";
import { Loader } from "../Loader/Loader.jsx";

const Chat = ({ message, setMessage, loader, setLoader }) => {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center overflow-hidden">
      {loader ? (
        <div className="z-100 "><Loader /></div>
      ) : (
        <>
          {/* Messages */}
          <div className="overflow-y-auto overflow-x-hidden flex flex-col items-center">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`flex w-[95vw] lg:w-3/4 md:w-3/4 mb-2  ${
                msg.role === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`font-mono wrap-break-word whitespace-pre-wrap leading-relaxed px-4 py-2 rounded-2xl max-w-[75%] ${
                  msg.role === "user"
                    ? "text-white border "
                    : "text-white border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          </div>

          {/* Input */}
          <div className="w-full py-3 pb-10">
            <Input setMessage={setMessage} setLoader={setLoader} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
