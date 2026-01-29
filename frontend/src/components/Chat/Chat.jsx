import { useContext } from "react";
import Input from "../Input/Input.jsx";
import { Loader } from "../Loader/Loader.jsx";
import ChatContext from '../../context/ChatContext.js'

const Chat = () => {
  const { message, loader} = useContext(ChatContext)

  
  return (
    // FULL HEIGHT (Navbar ke niche)
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3">
        {loader && (
          <div className="z-50 flex justify-center items-center">
            <Loader />
          </div>
        )}

        <div className="flex flex-col items-center">
          {!loader &&
          message.map((msg, index) => (
            <div
              key={index}
              className={`flex lg:w-3/4 md:w-3/4 w-full mb-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl font-inter tracking-wider wrap-break-word whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "text-white border "
                    : "text-white border "
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT AREA (BOTTOM FIXED SPACE) */}
      <div className="w-full pb-10 pt-3 border-t border-gray-700">
        <Input  />
      </div>
    </div>
  );
};

export default Chat;
