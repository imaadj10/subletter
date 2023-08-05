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
    <Flex as="nav" p="10px" pb="15px" mb="20px" mt="10px" justifyContent="space-between" borderBottom="1px solid #E2E8F0">
      <Heading as="h1" mx="20px" mb="5px" >Subletter</Heading>

      <HStack spacing="20px">
        <Link to="/listings">
          <Button bg="white">Listing</Button>
        </Link>

        <Link to="/housinginfo">
          <Button bg="white">Housing</Button>
        </Link>

        <Link>
          <Button bg="white"> About</Button>
        </Link>
      </HStack>

      <Spacer />

      <HStack spacing="20px" mr="20px">      
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
    </Flex>
    // <nav>
    //   <ul className="nav-bar">
    //     <li>
    //       <Link to="/home" className="nav-item">
    //         <img
    //           src={icon}
    //           style={{ width: 30, marginRight: 5, borderRadius: 10 }}
    //           alt="icon"
    //         />
    //         Subletter
    //       </Link>
    //     </li>
    //     {token && (
    //       <>
    //         <li className="right">
    //           <Link to="/profile" className="nav-item">
    //             Profile
    //           </Link>
    //         </li>
    //         <li className="right">
    //           <Link to="/messageboard" className="nav-item">
    //             Messages
    //           </Link>
    //         </li>
    //         <li className="right">
    //           <Link to="/notifications" className="nav-item">
    //             Notifications
    //           </Link>
    //         </li>
    //         <li className="right">
    //           <Link to="/housinginfo" className="nav-item">
    //             Housing
    //           </Link>
    //         </li>
    //         <li className="right">
    //           <Link to="/listings" className="nav-item">
    //             Listings
    //           </Link>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </nav>
  );
}
