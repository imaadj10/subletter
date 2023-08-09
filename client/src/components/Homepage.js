import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Box, Flex, Button, HStack } from '@chakra-ui/react';

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

  return (
    <Flex
      w={{ md: '80vw', xl: '40vw' }}
      margin="auto"
      mt="20px"
      pt="0"
      flexDirection="column"
      alignItems="center"
    >
      <Box className="hidden" as="section" mt="20px">
        <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
          Welcome to Subletter{username ? ' ' + username : ''}!
        </Text>
      </Box>

      <Box className="hidden" textAlign="center" mt="20px">
        <Text>
          Subletter is the ultimate web platform for students, offering a
          seamless experience to discover and promote both sublet opportunities
          and items for sale. From finding the perfect dorm sublet to buying and
          selling items among peers, we've got you covered. Simplifying the
          process and fostering a vibrant student community, Subletter is your
          go-to destination for hassle-free subletting and marketplace
          transactions.
        </Text>
        {!token && (
          <HStack
            className="hidden"
            margin="auto"
            width="30rem"
            backgroundColor="blue.100"
            padding="1rem"
            borderRadius="2rem"
            spacing="20px"
            mt="30px"
            justifyContent="center"
          >
            <Link to="/register">
              <Button colorScheme="blue">Register</Button>
            </Link>
            <Link to="/">
              <Button colorScheme="blue">Login</Button>
            </Link>
          </HStack>
        )}
      </Box>

      <Flex
        className="hidden"
        flexDirection="column"
        alignItems="center"
        as="section"
        mt="20px"
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
          We strive for excellence
        </Text>
        <Box textAlign="center" mt="20px">
          <Text>
            Our platform has all the information you need to get started on
            finding the best sublets, and it is unbelievably easy to find
            ratings of different residences which our trusted users have made
            over time
          </Text>
        </Box>
      </Flex>

      <Flex
        className="hidden"
        flexDirection="column"
        alignItems="center"
        as="section"
        mt="20px"
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="Center">
          Wait, that's not even the end of it
        </Text>
        <Box textAlign="center" mt="20px">
          <Text>
            Not only do we feature sublet listings, but users can post items to
            sell at unbelievable prices! Plus, you can rest assured that the
            items will all be located near campus so that you don't have to go
            through the hassle of filtering for locations!
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Homepage;
