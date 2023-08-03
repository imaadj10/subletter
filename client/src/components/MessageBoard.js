import '../css/Messages.css';
import axios from 'axios';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import { useState, useEffect, useRef } from 'react';
const sendIcon = require('../assets/send.png');

const MessageBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [conversations, setConversations] = useState([]);
  const [conversation_partner, setPartner] = useState('');
  const [messages, setMessages] = useState([]);
  const [sentMessage, setSentMessage] = useState([]);
  const chatBoxRef = useRef(null);
  const socketRef = useRef(null); // Use a ref to hold the socket instance

  useEffect(() => {
    // Establish the socket connection when the component mounts
    socketRef.current = io.connect('http://localhost:1234');

    // Clean up the socket connection when the component is unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); // Only run this effect once, on component mount

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

  useEffect(() => {
    // Scroll to the bottom of the chat box after messages are loaded
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Listen for 'new_message' event from the WebSocket server
    socketRef.current.on('new_message', (message) => {
      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:1234/messages/${conversation_partner}`,
        { message: sentMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      axios.post('http://localhost:1234/notifications', {
            username: conversation_partner,
            content: 'You have a new message!',
      });

      // Fetch the updated messages after sending the new message
      const response = await axios.get(
        `http://localhost:1234/messages/${conversation_partner}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the messages state with the new messages
      setMessages(response.data);

      // Clear the input after successful message send
      setSentMessage('');
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  return (
    <div>
      <div className="chat-message-container">
        <div className="conversations">
          <h1 className="chat-h1">Conversations</h1>
          {conversations.map((conversation) => {
            return (
              <div
                className="conversation"
                onClick={() =>
                  handleConversationClick(conversation.conversation_partner)
                }
              >
                {conversation.conversation_partner}
              </div>
            );
          })}
        </div>
        <div className="messages-container">
          <h2 className="name-header">{conversation_partner}</h2>
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((message) => {
              return message.sid === username ? (
                message.rid === username ? (
                  <>
                    <div className="message-right">{message.content}</div>
                    <div className="message-left">{message.content}</div>
                  </>
                ) : (
                  <div className="message-right">{message.content}</div>
                )
              ) : (
                <div className="message-left">{message.content}</div>
              );
            })}
          </div>
          <form onSubmit={submit} className="text-bar">
            <input
              type="text"
              placeholder="Type Message Here..."
              className="text-input-area"
              value={sentMessage}
              onChange={(e) => setSentMessage(e.target.value)}
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
