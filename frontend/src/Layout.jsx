import Navbar from './components/Navbar/Navbar.jsx'
import Chat from './components/Chat/Chat.jsx'
import { useState } from 'react'

const Layout = () => {
  const [message, setMessage] = useState([])
  return (
    <div className='w-full flex flex-col'>
        <Navbar />
        <Chat message={message} setMessage={setMessage}/>
    </div>
  )
}

export default Layout