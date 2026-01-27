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
        <div className="flex-1 w-[95vw] md:w-3/4 lg:w-3/4 items-center justify-center overflow-y-auto overflow-x-hidden px-5 pt-3">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 font-mono wrap-break-word whitespace-pre-wrap leading-relaxed w-full lg:w-fit md:w-fit px-4 py-2 rounded-2xl  ${
                msg.role === "user"
                  ? "text-[#4F8CFF] bg-transparent border border-blue-400 "
                  : "text-[#4ADE80] bg-transparent border border-green-400 "
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
