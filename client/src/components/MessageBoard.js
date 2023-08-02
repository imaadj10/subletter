import '../css/Messages.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
const sendIcon = require('../assets/send.png');

const MessageBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [conversations, setConversations] = useState([]);
  const [conversation_partner, setPartner] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1234/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setConversations(res.data);
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }, []);

  const handleConversationClick = (conversation_partner) => {
    setPartner(conversation_partner);
    axios
      .get(`http://localhost:1234/messages/${conversation_partner}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }

  return (
    <div>
      <div className="chat-message-container">
        <div className="conversations">
          <h1 className="chat-h1">Conversations</h1>
          {conversations.map((conversation) => {
            return <div className="conversation"
                    onClick={() => handleConversationClick(conversation.conversation_partner)}>{conversation.conversation_partner}</div>;
          })}
        </div>
        <div className="messages-container">
          <h2 className="name-header">{conversation_partner}</h2>
          <div className="chat-box">
            {messages.map((message) => {
              return message.sid === username ? (
                <div className="message-right">{message.content}</div>
              ) : (
                <div className="message-left">{message.content}</div>
              );
            })}
          </div>
          <form className="text-bar">
            <input
              type="text"
              placeholder="Type Message Here..."
              className="text-input-area"
            ></input>
            <button type="submit" className="send-button">
              <img src={sendIcon} alt="send" className="send-icon"></img>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;
