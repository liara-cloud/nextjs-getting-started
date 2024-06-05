import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const fullMessage = `${username}: ${message}`;
      socket.emit('message', fullMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            {msg}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="username-input"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>

      <style jsx>{`
        .chat-container {
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .messages {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 10px;
        }

        .message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 8px;
          background-color: #f0f0f0;
        }

        .input-container {
          display: flex;
          align-items: center;
        }

        .username-input,
        .message-input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }

        .send-button {
          padding: 10px 20px;
          border-radius: 8px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .send-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
