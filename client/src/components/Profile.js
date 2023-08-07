import '../css/Profile.css';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './ProfileEdit';
import profile_Image from '../assets/temp-avatar.jpg';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  ModalOverlay,
  Modal,
  Text,
  useDisclosure,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

const Profile = () => {
  const editModal = useDisclosure();
  const logoutModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');

  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:1234/users/?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setDescription(res.data.description);
            setSchool(res.data.school_name);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const deleteAccount = async () => {
    try {
      await axios
        .delete(`http://localhost:1234/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('deleted');
          cookies.remove('TOKEN', { path: '/' });
          cookies.remove('USERNAME', { path: '/' });
          history('/home', {});
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    cookies.remove('USERNAME', { path: '/' });
    history('/home', {});
  };

  // const edit = () => {
  //   onEditOpen();
  //   document.getElementById('edit-details-modal').showModal();
  // };

  return (
    <>
      <Grid
        marginInline={{ md: '5vw', xl: '10vw' }}
        templateColumns="1fr 3fr"
        gap={6}
      >
        <GridItem w="100%" h="100%">
          <Image
            src={profile_Image}
            objectFit="cover"
            alt="profile"
            borderRadius="full"
          />
          <Text marginBlock="0.5rem" textAlign="center">
            {school}
          </Text>
        </GridItem>
        <GridItem w="100%" h="100%" borderRadius="1rem">
          <Box>
            <Text paddingBlock="1rem" fontSize="3xl" fontWeight="bold">
              {username}
            </Text>
            <Box bg="blue.100" borderRadius="1rem" p="1rem">
              <Text fontSize="lg" fontWeight="bold">
                Description
              </Text>
              <Text>{description}</Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Flex width="100%" justifyContent="center" p="2rem" gap="1rem">
        <Button
          size="sm"
          variant="solid"
          colorScheme="blue"
          onClick={editModal.onOpen}
        >
          Edit Details
        </Button>
        <Button
          size="sm"
          variant="solid"
          colorScheme="red"
          onClick={logoutModal.onOpen}
        >
          Logout
        </Button>
        <Button
          size="sm"
          variant="solid"
          colorScheme="red"
          onClick={deleteModal.onOpen}
        >
          Delete Account
        </Button>
      </Flex>
      <Modal
        borderRadius="2rem"
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfile
              props={{
                token,
                username,
                description,
                setDescription,
                onClose: editModal.onClose,
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        borderRadius="2rem"
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Are you sure you want to logout?
          </ModalHeader>
          <ModalCloseButton />
          <Flex gap="1rem" justifyContent="center">
            <Button colorScheme="blue" marginBottom="1rem" onClick={logout}>
              Yes
            </Button>
            <Button
              colorScheme="red"
              marginBottom="1rem"
              onClick={logoutModal.onClose}
            >
              No
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      <Modal
        borderRadius="2rem"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Are you sure you want to delete your account?
          </ModalHeader>
          <ModalCloseButton />
          <Flex gap="1rem" justifyContent="center">
            <Button
              colorScheme="blue"
              marginBottom="1rem"
              onClick={deleteAccount}
            >
              Yes
            </Button>
            <Button
              colorScheme="red"
              marginBottom="1rem"
              onClick={deleteModal.onClose}
            >
              No
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Profile;
