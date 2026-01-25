import Input from '../Input/Input.jsx'

const Chat = ({ message, setMessage }) => {
  console.log(message)
  return (
    <div className='flex flex-col flex-1 w-full'>
      <div className='flex-1 w-full text-white overflow-y-auto'>
        {message.map((msg, index) => (
          <div key={index} className="mb-2">
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <div className='w-full'>
        <Input setMessage={setMessage} />
      </div>
    </div>
  )
}

export default Chat