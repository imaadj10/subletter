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
  Text,
} from '@chakra-ui/react';

const Profile = () => {
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
    const confirmed = window.confirm(
      'Are you sure you want to delete this account?'
    );

    if (confirmed) {
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
    }
  };

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    cookies.remove('USERNAME', { path: '/' });
    history('/home', {});
  };

  const edit = () => {
    document.getElementById('edit-details-modal').showModal();
  };

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
        <Button size="sm" variant="solid" colorScheme="blue" onClick={edit}>
          Edit Details
        </Button>
        <Button size="sm" variant="solid" colorScheme="red" onClick={logout}>
          Logout
        </Button>
        <Button
          size="sm"
          variant="solid"
          colorScheme="red"
          onClick={deleteAccount}
        >
          Delete Account
        </Button>
      </Flex>

      {/* <div>
        <div className="Profile">
          <div className="Profile-Upper-Section">
            <div className="Profile-left">
              <div className="Profile-image">
                <img src={profile_Image} alt="Profile" />
              </div>
              <div className="Profile-detail">
                <div className="Profile-university">{school}</div>
                <div className="Profile-major">Anthropology</div>
                <div className="Profile-year">3rd Year</div>
              </div>
            </div>
            <div className="Profile-right">
              <h1 className="Profile-name">{username}</h1>
              <div className="Profile-description">
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={Edit}>Edit Details</button>
            <button className="red" onClick={logout}>
              Logout
            </button>
            <button className="red" onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
        </div> */}

      <dialog data-modal id="edit-details-modal">
        <EditProfile
          props={{
            token,
            username,
            description,
            setDescription,
          }}
        />
      </dialog>
      {/* </div> */}
    </>
  );
};

export default Profile;
