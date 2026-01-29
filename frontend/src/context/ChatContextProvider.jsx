import React, { useState } from 'react'
import ChatContext from './ChatContext'

const ChatContextProvider = ({children}) => {
    const [message, setMessage] = useState([])
    const [loader, setLoader] = useState(false)
    const [text, setText] = useState("");
  return (
    <ChatContext.Provider value={{message,setMessage,loader,setLoader,text,setText}}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider