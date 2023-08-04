// import '../css/Authorization.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  VStack,
  Heading,
  Text,
  HStack,
  Select,
} from '@chakra-ui/react';

const Register = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [availableSchools, setAvailableSchools] = useState([]);

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);

  async function submit(e) {
    e.preventDefault();

    console.log(school)

    try {
      await axios
        .post('http://localhost:1234/register', {
          username: username.toLowerCase(),
          password,
          name,
          school,
        })
        .then((res) => {
          console.log(res.data);
          cookies.set('TOKEN', res.data.token, {
            path: '/',
          });
          cookies.set('USERNAME', res.data.username, {
            path: '/',
          });
          history('/home', {});
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function getSchoolsList() {
    try {
      await axios
        .get('http://localhost:1234/schools', {
          params: {
            text: school,
          },
        })
        .then((res) => {
          const modifiedData = res.data.map((school) => ({
            ...school,
            id: uuidv4(),
          }));
          console.log(modifiedData);
          // Update the state with the modified data
          setAvailableSchools(modifiedData);
        })
      console.log(availableSchools);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSchoolsList();
  }, []);

  return (
    <Box
      w={{ base: 'full', md: 'md' }}
      p={{ base: 8, md: 10 }}
      mb="80px"
      mt={{ base: 20, md: '10vh' }}
      mx="auto"
      border={{ base: 'none', md: '1px' }}
      borderColor={{ base: '', md: 'gray.300' }}
      borderRadius="10"
    >
      <VStack spacing="4" align="flex-start" w="full">
        <VStack spacing="1" align="center" w="full">
          <Heading>User Registration</Heading>
          <Text>
            Fields marked by{' '}
            <Box as="span" color="red">
              *
            </Box>{' '}
            are required
          </Text>
        </VStack>

        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel> Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            variant="filled"
          />
        </FormControl>

        <FormControl>
          <FormLabel>School</FormLabel>
          <Select
            placeholder="Select School"
            onChange={(e) => setSchool(e.target.value)}
            variant="filled"
          >
            {availableSchools.map((school) => {
              // console.log(school.school_name);
              return <option key={school.id}>{school.school_name}</option>;
            })}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <Button onClick={submit} colorScheme="blue" w="full">
          Create Account
        </Button>

        <HStack w="full" justify="center">
          <Text>Already have an account?</Text>
          <Link to="/">
            <Button variant="link" colorScheme="blue">
              Sign in!
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );

  // return (
  //   <div className="section form-page">
  //     <h1>Sign Up!</h1>
  //     <form action="POST" className="auth-form">
  //       <label for="name">Name</label>
  //       <input
  //         name="name"
  //         className="form-text"
  //         placeholder="Name"
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //       <label htmlFor="available-schools">School</label>
  //       <input
  //         value={school}
  //         onChange={(e) => setSchool(e.target.value)}
  //         list="available-schools"
  //         name="available-schools"
  //         className="form-text"
  //       />
  //       <datalist id="available-schools">
  //         {availableSchools.map((school) => {
  //           console.log(school.school_name);
  //           return <option value={school.school_name} />;
  //         })}
  //       </datalist>

  //       <label for="username">Username</label>
  //       <input
  //         name="username"
  //         className="form-text"
  //         placeholder="Username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value.toLowerCase())}
  //       />
  //       <label htmlFor="password">Password</label>
  //       <input
  //         type="password"
  //         className="form-text"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button onClick={submit} className="auth-button">
  //         Submit
  //       </button>
  //     </form>
  //     <div>
  //       <span className="padding-right">Already have an account?</span>
  //       <Link to="/">Login Page</Link>
  //     </div>
  //   </div>
  // );
};

export default Register;
