import Input from "../Input/Input.jsx";
import {Loader} from "../Loader/Loader.jsx";

const Chat = ({ message, setMessage, loader, setLoader }) => {
  console.log(message);    return (
    <>
return (
  <div className="flex flex-col flex-1 w-full items-center overflow-hidden">
    {loader ? (
      <Loader />
      
    ) : (
      <>
        <div className="flex-1 w-11/12 lg:max-w-3/4 overflow-y-auto overflow-x-hidden px-5 pt-3">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 font-mono wrap-break-word whitespace-pre-wrap leading-relaxed w-fit bg-[#333] px-4 py-2 rounded-2xl text-center ${
                msg.role === "user"
                  ? "text-[#4F8CFF]"
                  : "text-[#4ADE80]"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="w-full py-3 pb-10">
          <Input setMessage={setMessage} setLoader={setLoader} />
        </div>
      </>
    )}
  </div>
);


    </>
  );
  
  
};

export default Chat;
