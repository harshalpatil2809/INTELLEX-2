import Input from '../Input/Input.jsx'

const Chat = ({ message, setMessage }) => {
  console.log(message)
  return (
    <div className='flex flex-col flex-1 w-full items-center relative min-h-[90vh] lg:min-h-[85vh]'>
      <div className='flex-1 w-full  text-white overflow-y-scroll lg:w-3/4 px-2 pt-3'>
        {message.map((msg, index) => (
          <div key={index} className="mb-2 flex flex-col gap-2">
            {msg}
          </div>
        ))}
      </div>
      <div className='w-full absolute bottom-0'>
        <Input setMessage={setMessage} />
      </div>
    </div>
  )
}

export default Chat