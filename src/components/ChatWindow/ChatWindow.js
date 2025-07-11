import "./ChatWindow.css"

const ChatWindow = () => {
  return (
    <div id='chat-window'>
        <ChatBody />
        <TextBar />
    </div>
  )
}

const ChatBody = () => {
  return (
    <div id="chat-body">body</div>
  )
}

const TextBar = () => {
  return (
    <div id="textbar">textBar</div>
  )
}

export default ChatWindow