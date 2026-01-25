import Navbar from './components/Navbar/Navbar.jsx'
import Chat from './components/Chat/Chat.jsx'
const Layout = () => {
  return (
    <div className='w-full flex flex-col'>
        <Navbar />
        <Chat />
    </div>
  )
}

export default Layout