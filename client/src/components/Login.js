// import '../css/Authorization.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, Link, Form } from 'react-router-dom';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Checkbox,
} from '@chakra-ui/react';

const Login = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:1234/login', {
          username: username.toLowerCase(),
          password,
        })
        .then((res) => {
          cookies.set('TOKEN', res.data.token, {
            path: '/',
          });
          cookies.set('USERNAME', res.data.username, {
            path: '/',
          });

          axios.post(
            'http://localhost:1234/notifications',
            {
              title: 'Welcome to the app!',
              username: res.data.username,
              content: `Welcome back ${res.data.username}`,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            }
          );

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
          <Heading>Login</Heading>
          <Text>Enter your username and password to login</Text>
        </VStack>

        <FormControl>
          <FormLabel>Username:</FormLabel>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <HStack w="full" justify="space-between">
          <Checkbox>Remenber Me</Checkbox>
          <Button variant="link" colorScheme="blue">
            Forgot Password?
          </Button>
        </HStack>
        <Button onClick={submit} colorScheme="blue" w="full">
          Login
        </Button>

        <HStack w="full" justify="center">
          <text>Don't have an account?</text>
          <Button variant="link" colorScheme="blue">
            Sign up!
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
