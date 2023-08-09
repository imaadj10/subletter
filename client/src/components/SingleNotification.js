import axios from 'axios';
import { Flex, Spacer, Box, Text, Button } from '@chakra-ui/react';

export default function SingleNotification(props) {
  const { id, title, content, setNotifications, token } = props;

  async function deleteNotification() {
    try {
      await axios
        .delete(`http://localhost:1234/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotifications((prevNotifs) => {
            return prevNotifs.filter((notif) => notif.id !== id);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Flex
        gap="3rem"
        maxWidth="800px"
        bg="gray.100"
        p="1rem"
        borderRadius="1rem"
        w="80%"
        marginInline="auto"
        marginBlock="1rem"
      >
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Text>{content}</Text>
        </Box>
        <Spacer />
        <Button
          alignSelf="center"
          onClick={deleteNotification}
          borderRadius="0.5rem"
          size="sm"
          colorScheme="red"
        >
          Delete
        </Button>
      </Flex>
    </>
  );
}
