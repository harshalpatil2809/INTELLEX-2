import Navbar from './components/Navbar/Navbar.jsx'
import Chat from './components/Chat/Chat.jsx'
import { useState } from 'react'

const Layout = () => {
  const [message, setMessage] = useState([])
  const [loader, setLoader] = useState(false)
  return (
    <div className='w-full h-full flex flex-col'>
        <Navbar />
        <Chat message={message} setMessage={setMessage} loader={loader} setLoader={setLoader}/>
    </div>
  )
}

export default Layout;