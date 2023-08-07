import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Flex, Box, Heading, Button, Spacer, HStack } from '@chakra-ui/react';
import { ChatIcon, BellIcon} from '@chakra-ui/icons';

const icon = require('../assets/icon.png');

export default function Navbar() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  return (
    <Flex as="nav" p="10px" pb="15px" mt="10px" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
      <Link to="/">
        <Heading as="h1" mx="20px" mb="5px">Subletter</Heading>
      </Link>

      {token && ( 
        <div>
            <HStack spacing="20px" pt="8px">
            <Link to="/listings">
              <Button bg="white">Listings</Button>
            </Link>

            <Link to="/housinginfo">
              <Button bg="white">Housing</Button>
            </Link>

            <Link>
              <Button bg="white"> About</Button>
            </Link>
          </HStack>

        </div>
       )}  

      <Spacer />

      {token && ( 
        <div>
          <HStack spacing="20px" mr="20px" pt="5px">      
            <Link to="/notifications" >
              <Button colorScheme="blue">
                <BellIcon />
              </Button>
            </Link>

            <Link to="/messageboard">
              <Button colorScheme="blue">
                <ChatIcon />
              </Button>
            </Link>

            <Link to="/profile">
              <Button colorScheme="blue">Profile</Button>
            </Link>
          </HStack>
        </div>
      )}
    </Flex>
  );
}
