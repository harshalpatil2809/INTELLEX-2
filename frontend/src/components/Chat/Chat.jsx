import Input from "../Input/Input.jsx";

const Chat = ({ message, setMessage }) => {
  console.log(message);
  return (
    <div className="flex flex-col flex-1 w-full items-center overflow-hidden">
      <div className="flex-1 w-full lg:w-3/4 overflow-y-auto overflow-x-hidden px-5 pt-3">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 font-mono wrap-break-word whitespace-pre-wrap leading-relaxed ${
              msg.role === "user"
                ? "text-left text-blue-400 w-fit bg-[#333] px-4 py-2 rounded-2xl "
                : "text-right text-green-400 w-fit bg-[#333] px-4 py-2 rounded-2xl lg:max-w-3/4"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="w-full py-3">
        <Input setMessage={setMessage} />
      </div>
    </div>
  );
};

export default Chat;
