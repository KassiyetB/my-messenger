import "./ChatWindow.css"
import { useState, useRef } from 'react'

const ChatWindow = () => {
  return (
    <div id='chat-window'>
        <ChatBody />
        <TextBar />
    </div>
  )
}

const ChatBody = () => {
  const messages = [
    {
      id: "124",
      sender_id: "self",
      reciever_id: "John",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      timestamp: "09:00",
    },
    {
      id: "125",
      sender_id: "self",
      reciever_id: "John",
      content: "asdfasdfasdfasdfasdf",
      timestamp: "09:01",
    }
  ]
  return (
    <div id="chat-body">
      {messages.map(message => {
        return <Message key={message.id} message={message} />
      })}
    </div>
  )
}

const Message = (props) => {
  return(
    <div className="message">
      <p className="message-content">{props.message.content}</p>
      <p className="message-time">{props.message.timestamp}</p>
    </div>
  )
}

const TextBar = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setValue(e.target.value);
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200); 
    textarea.style.height = newHeight + "px";
  }
  return (
    <div id="textbar">
      <form id="textbar-form">
        <div id="textbar-form-inputbar">
          <textarea
          id="textbar-form-textarea"
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="Type here..."
          rows={1} cols={40}/>
          <input className="btn" type="submit" value="send"/>
        </div>
      </form>
    </div>
  )
}

export default ChatWindow