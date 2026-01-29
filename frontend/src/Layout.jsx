import Navbar from "./components/Navbar/Navbar.jsx";
import Chat from "./components/Chat/Chat.jsx";
import ChatContextProvider from "./context/ChatContextProvider.jsx";

const Layout = () => {
  return (
    <ChatContextProvider>
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Chat />
      </div>
    </ChatContextProvider>
  );
};

export default Layout;
