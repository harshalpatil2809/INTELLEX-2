import Input from '../Input/Input.jsx'

const Chat = () => {
  return (
    <div className='flex flex-col flex-1 w-full'>
      <div className='flex-1 w-full text-white overflow-y-auto'>
        Hello
      </div>
      <div className='w-full'>
        <Input />
      </div>
    </div>
  )
}

export default Chat