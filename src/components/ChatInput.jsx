import dayjs from 'dayjs';
import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerImage from './../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if(event.key === "Enter") {
      sendMessage();
    } else if(event.key === "Escape") {
      setInputText('');
    }
  }

  function clearMessage() {
    setChatMessages([]);
  }
  async function sendMessage() {
    setInputText('');
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText ,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-img" src={LoadingSpinnerImage} /> ,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response ,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to a Chatbot" 
        size="30" 
        onKeyDown={handleKeyDown}
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessage}
        className="clear-button"
      >
        Clear
      </button>
    </div>
  )
};