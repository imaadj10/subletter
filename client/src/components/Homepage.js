import '../css/Homepage.css';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import {
  Text,
  Box,
  Flex,
  Button,
  HStack,
} from '@chakra-ui/react';

const Homepage = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  let navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(
      (element) => {
        observer.observe(element);
      },
      { threshold: 1 }
    );
  }, []);

  const redirectRegister = () => {
    navigate('/register', {});
  };

  const redirectLogin = () => {
    navigate('/', {});
  };

  return (
    <Box>
      {/* <Flex justifyContent="center">
        <Image w={{ lg: "700px", xl: "1200px" }} h={{ lg: "300px", xl: "600" }} src={`${campus}`}></Image>
      </Flex> */}

      {token && (
        <Flex w="vw" mt="20px" pt="0" flexDirection="column" alignItems="center">
          <Box as="section" mt="20px">
            <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
              Welcome back {username}!
            </Text>
            <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
              Discover new Listings!
            </Text>
          </Box>
        </Flex>  
      )}

      {!token && (
        <Flex w="vw" mt="20px" pt="0" flexDirection="column" alignItems="center">
          <Box as="section" mt="20px">
            <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
              Welcome to Subletter
            </Text>
          </Box>

          <Box w="40%" textAlign="center" mt="20px">
            <Text>
              Subletter is the ultimate web platform for students, offering a
              seamless experience to discover and promote both sublet opportunities
              and items for sale. From finding the perfect dorm sublet to buying and
              selling items among peers, we've got you covered. Simplifying the
              process and fostering a vibrant student community, Subletter is your
              go-to destination for hassle-free subletting and marketplace
              transactions.
            </Text>
            <HStack spacing="20px" mt="30px" justifyContent="center">
              <Link to="/register">
                <Button colorScheme="blue">Register</Button>
              </Link>
              <Link to="/">
                <Button colorScheme="blue">Login</Button>
              </Link>
            </HStack>
          </Box>
        </Flex>  
      )}
    </Box>
    // <div className="home-container">
    //   <div>
    //     <h1 className="hidden">Welcome {username}! </h1>

    //     <section className="hidden" style={{ marginTop: 50 }}>
    //       <h1 className="home-h1">
    //         The perfect place to sell your items and find the best sublets on
    //         campus.
    //       </h1>
    //       <h3>The cheapest, most affordable sublets that every student uses</h3>

    //       {!token && (
    //         <div className="auth-links">
    //           <button onClick={redirectRegister}>Get Started</button>
    //           <button onClick={redirectLogin}>Login</button>
    //         </div>
    //       )}
    //     </section>

    //     <section className="hidden">
    //       <h1 className="home-h1">Create postings in the blink of an eye!</h1>
    //     </section>

    //     <section className="hidden">
    //       <h1 className="home-h1">
    //         Chat with friends and discover new listings!
    //       </h1>
    //     </section>
    //   </div>
    // </div>
  );
};

export default Homepage;
