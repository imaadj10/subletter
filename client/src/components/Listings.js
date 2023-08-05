import '../css/Listings.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NewListing from './NewListing';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Box,
  Flex,
  Button,
  HStack,
  SimpleGrid,
  Image,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { Search2Icon, AddIcon } from '@chakra-ui/icons';

const Listings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const finalRef = useRef(null)

  const types = {
    items: 'Items',
    sublets: 'Sublets',
    all: 'All',
  };
  const [type, setType] = useState(types.all);
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);

  useEffect(() => {
    axios
      .get(`http://localhost:1234/listings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }, []);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const changeMin = (e) => {
    if (parseInt(e.target.value) <= max) {
      setMin(e.target.value);
    }
  };
  const changeMax = (e) => {
    if (parseInt(e.target.value) >= min) {
      setMax(e.target.value);
    }
  };

  const createNewListing = () => {
    document.getElementById('create-new-listing-modal').showModal();
  };

  return (
    <Flex flexDirection="column" border="1px">
      <Box
        mt="20px"
        borderRadius="20px"
        position="sticky"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        w="40%"
        h="70px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <InputGroup
          w="100%"
          bg="white"
          borderRadius="10px"
          border="5px solid rgb(49, 130, 206)"
        >
          <InputLeftElement children={<Search2Icon color="gray.600" />} />
          <Input
            type="text"
            variant="filled"
            placeholder="Search listings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Box>

      <SimpleGrid p="20px" spacing="10" minChildWidth="300px">
        {listings.map((listing) => {
          return (
            <Listing
              key={listing.lid}
              lid={listing.lid}
              name={listing.name}
              username={listing.username}
              price={listing.price}
              image={listing.image}
            />
          );
        })}
      </SimpleGrid>

      <Box position="fixed" right="40px" bottom="30px" >
        <Button position="fixed" right="40px" bottom="30px" colorScheme="blue" p="30px" borderRadius="30px" onClick={onOpen}>
          Add Listing
        </Button>
      </Box>

      <Modal blockScrollOnMount={false} size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewListing
              props={{
                username,
                token,
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add Listing</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <dialog data-modal id="create-new-listing-modal">
        <NewListing
          props={{
            username,
            token,
          }}
        />
      </dialog> */}
    </Flex>
  );
};

const Listing = ({ lid, name, username, price, image }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.currentTarget.id);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      id={lid}
      onClick={handleClick}
      cursor="pointer"
    >
      <Image
        src={`http://localhost:1234/images/${image}`}
        h="300px"
        w="full"
        objectFit="cover"
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Sublet
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {name}
        </Box>

        <Box>
          {price}
          <Box as="span" color="gray.600" fontSize="sm">
            / month
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Listings;
