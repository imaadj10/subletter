import '../css/Messages.css';
import axios from 'axios';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Image,
} from '@chakra-ui/react';
const sendIcon = require('../assets/send.png');

export default function MessageBoard() {
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

      axios.post(
        'http://localhost:1234/notifications',
        {
          title: 'You have a new message!',
          username: conversation_partner,
          content: `${conversation_partner} has sent you a new message!`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <>
      <Flex m="1rem" gap="1rem">
        <Box minWidth="150px" overflowY="auto" w={{ md: '200px', xl: '300px' }}>
          <Text fontWeight="semibold" fontSize="xl">
            Conversations
          </Text>
          <Box overflowY="auto" height={'calc(100vh - 150px)'}>
            {conversations.map((conversation) => {
              return (
                <Box
                  _hover={{ cursor: 'pointer', backgroundColor: 'blue.400' }}
                  bg={
                    conversation.conversation_partner === conversation_partner
                      ? 'blue.400'
                      : 'blue.100'
                  }
                  borderRadius="0.5rem"
                  p="0.5rem"
                  m="0.3rem"
                  onClick={() =>
                    handleConversationClick(conversation.conversation_partner)
                  }
                >
                  {conversation.conversation_partner}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box w="100%">
          <Box
            p="0.5rem"
            mb="0.5rem"
            bg="blue.300"
            borderRadius="1rem"
            textAlign="center"
          >
            {conversation_partner
              ? conversation_partner
              : 'Select a chat on the left!'}
          </Box>
          <VStack
            overflowY="auto"
            height={'calc(100vh - 225px)'}
            spacing="0.3rem"
            ref={chatBoxRef}
          >
            {messages.map((message) => {
              if (message.sid === username) {
                return <RightMessage text={message.content} />;
              } else {
                return <LeftMessage text={message.content} />;
              }
            })}
          </VStack>
          {conversation_partner && (
            <form onSubmit={submit} style={{ marginTop: '1rem' }}>
              <HStack>
                <Input
                  width="100%"
                  placeholder="Send a message..."
                  value={sentMessage}
                  onChange={(e) => setSentMessage(e.target.value)}
                />
                <Button type="submit">
                  <Image width="20px" src={sendIcon} alt="send" />
                </Button>
              </HStack>
            </form>
          )}
        </Box>
      </Flex>
    </>
  );
}

const LeftMessage = ({ text }) => {
  return (
    <HStack w="100%" justifyContent="flex-start">
      <Text
        maxWidth="90%"
        marginLeft="1rem"
        p="0.8rem"
        bg="purple.200"
        borderRadius="1rem"
      >
        {text}
      </Text>
    </HStack>
  );
};

const RightMessage = ({ text }) => {
  return (
    <HStack w="100%" justifyContent="flex-end">
      <Text
        maxWidth="90%"
        marginRight="1rem"
        p="0.8rem"
        bg="blue.200"
        borderRadius="1rem"
      >
        {text}
      </Text>
    </HStack>
  );
};
