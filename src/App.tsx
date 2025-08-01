import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import RobotProfileImage from './assets/robot.png';
import './App.css'


function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const title = `${chatMessages.length === 0
      ? 'Chatbot Project'
      : `${chatMessages.length} Messages | Chatbot Project`
    }`;

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={RobotProfileImage} />
      <div className="app-container">
        {chatMessages.length === 0 && (
          <div className="welcome-message">
            Welcome to the Chatbot Project!
            <p
              className="welcome-message-desc">Send a message using the textbox below.
            </p>
          </div>
        )}
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>

  )
};


export default App
