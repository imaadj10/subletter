import { useRef, useState } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

export default function EditProfile({ props }) {
  const cookies = new Cookies();
  const history = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const descriptionRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [usernameErr, setUsernameErr] = useState();
  const [passwordErr, setPassErr] = useState();
  const [passEqualityErr, setPassEqualityErr] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // Get the new_username and new_password from the input fields using refs
    const new_username = usernameRef.current.value;
    const new_password = passwordRef.current.value;
    const confirm_password = confirmPasswordRef.current.value;
    const new_description = descriptionRef.current.value;

    if (
      !new_username ||
      !new_password ||
      !confirm_password ||
      confirm_password !== new_password
    ) {
      new_username ? setUsernameErr(false) : setUsernameErr(true);
      new_password ? setPassErr(false) : setPassErr(true);
      confirm_password === new_password
        ? setPassEqualityErr(false)
        : setPassEqualityErr(true);
    } else {
      props.onClose(e);
      try {
        // Values that are going to be send to the backend
        let input_username = undefined;
        let input_description = undefined;

        // Check if inputted username is the same as the current username
        if (new_username !== props.username) {
          input_username = new_username;
        }

        // Check if inputted description is the same as the current description
        if (new_description !== props.description) {
          input_description = descriptionRef.current.value;
        }

        await axios
          .patch(
            'http://localhost:1234/users',
            {
              old_username: props.username,
              new_username: input_username,
              new_password: new_password,
              new_description: input_description,
            },
            {
              headers: { Authorization: `Bearer ${props.token}` },
            }
          )
          .then((res) => {
            cookies.set('TOKEN', res.data.token, {
              path: '/',
            });

            // Reset the USERNAME cookie if new username is not undefined
            if (new_username) {
              cookies.set('USERNAME', res.data.username, {
                path: '/',
              });
            }

            if (input_description) {
              props.setDescription(input_description);
            }
            props.onClose(e);
            history('/profile', {});
          })
          .catch((e) => {
            alert('Res then failed');
            console.log(e);
          });
      } catch (e) {
        // If an error occurs, show an alert and log the error
        alert('Failed to change info');
        console.log(e);
      }
    }
  }

  return (
    <>
      <FormControl>
        <FormControl isInvalid={usernameErr} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            variant="filled"
            ref={usernameRef}
            type="text"
            defaultValue={props.username}
          />
          {usernameErr && (
            <FormErrorMessage>You must input a username</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={passwordErr} isRequired>
          <FormLabel>New Password</FormLabel>
          <Input ref={passwordRef} variant="filled" type="password" />
          {passwordErr && (
            <FormErrorMessage>You must input a password</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={passEqualityErr} isRequired>
          <FormLabel>Re-Enter New Password</FormLabel>
          <Input ref={confirmPasswordRef} variant="filled" type="password" />
          {passEqualityErr && (
            <FormErrorMessage>Your passwords don't match</FormErrorMessage>
          )}
        </FormControl>

        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Write a description..."
          ref={descriptionRef}
          defaultValue={props.description}
        ></Textarea>
        <Button
          colorScheme="blue"
          marginTop="1rem"
          width="100%"
          type="submit"
          onClick={submit}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
}
