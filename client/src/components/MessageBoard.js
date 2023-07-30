import { useState } from 'react';
const sendIcon = require('../images/send.png');

const MessageBoard = () => {
  const [users, setUsers] = useState([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
  ]);

  return (
    <div>
      <div className="chat-message-container">
        <div className="users">
          <h1 className="chat-h1">Chat Messages</h1>
          {users.map((user) => {
            return <div className="user">{user}</div>;
          })}
        </div>
        <div className="messages-container">
          <h2 className="name-header">Yu Cheng Li</h2>
          <div className="chat-box">
            {users.map((user) => {
              return <div className="message-left">{user}</div>;
            })}
            {users.map((user) => {
              return <div className="message-right">{user}</div>;
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
