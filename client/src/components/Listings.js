import '../css/Listings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NewListing from './NewListing';
import { useNavigate } from 'react-router-dom';
import {
  Icon,
  Box,
  Flex,
  Button,
  SimpleGrid,
  Image,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon, AddIcon } from '@chakra-ui/icons';

const Listings = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  // const handleTypeChange = (e) => {
  //   setType(e.target.value);
  // };

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
    <Flex flexDirection="column">
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
              type={listing.type}
              price={listing.price}
              image={listing.image}
            />
          );
        })}
      </SimpleGrid>

      <Box position="fixed" right="40px" bottom="30px">
        <Button
          position="fixed"
          right="40px"
          bottom="30px"
          colorScheme="blue"
          p="30px"
          borderRadius="30px"
          onClick={handleOpenModal}
        >
          <Flex align="center">
            <Icon as={AddIcon} boxSize={4} mr="2" />
            Add Listing
          </Flex>
        </Button>
      </Box>

      <NewListing
        props={{
          username,
          token,
        }}
        isOpen={isModalOpen}
        onOpen={handleOpenModal}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

const Listing = ({ lid, name, price, image, type }) => {
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
        src={`http://localhost:1234/images/listings/${image}`}
        h="300px"
        w="full"
        objectFit="cover"
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {type === 'sublet' ? (
            <Badge borderRadius="full" px="2" colorScheme="blue">
              Sublet
            </Badge>
          ) : (
            <Badge borderRadius="full" px="2" colorScheme="red">
              Item
            </Badge>
          )}
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
          ${price}
          {type === 'sublet' ? (
            <Box as="span" color="gray.600" fontSize="sm">
              /month
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Listings;
