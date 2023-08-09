import { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export default function NewMessage({ props, isOpen, onOpen, onClose }) {
  const toast = useToast()
  const [message, setMessage] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        `http://localhost:1234/messages/${props.listing.username}`,
        { message: message },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Modal
      blockScrollOnMount={false}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Seller a Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            rows={10}
            placeholder="Write a message to the seller..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            resize="vertical"
          />
        </ModalBody>
        <ModalFooter>
        <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            border="2px solid rgb(49, 130, 206)"
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={(e) => {
              submit(e);
              toast({
                title: 'Message Sent!',
                description: `${props.listing.username} has received your message!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            Send Message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
