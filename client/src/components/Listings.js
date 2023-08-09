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
  filter,
} from '@chakra-ui/react';
import { Search2Icon, AddIcon, SmallCloseIcon } from '@chakra-ui/icons';

const Listings = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

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
        setFilteredListings(res.data);
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }, []);

  const handleFilter = (e) => {
    if (search !== '' || min || max) {
      setFilterApplied(true);
    }
    const filtered = listings.filter(
      (listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()) &&
        (!min || listing.price >= parseFloat(min)) &&
        (!max || listing.price <= parseFloat(max))
    );
    setFilteredListings(filtered);
  };

  const clearFilters = (e) => {
    setFilterApplied(false);
    setSearch('');
    setMin('');
    setMax('');
    setFilteredListings(listings);
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === 69 || // 'e' key
      e.keyCode === 187 || // '+' key
      e.keyCode === 189 // '-' key
    ) {
      e.preventDefault(); // Prevent the input of these characters
    }
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
        w="50%"
        h="70px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <InputGroup w="60%" mr="10px">
          <InputLeftElement children={<Search2Icon color="gray.600" />} />
          <Input
            type="text"
            variant="filled"
            placeholder="Search listings"
            value={search}
            borderWidth="1px"
            onChange={(e) => setSearch(e.target.value)}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <InputGroup w="20%" mx="10px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.600"
            fontSize="1.2em"
            children="$"
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Min"
            value={min}
            borderWidth="1px"
            onChange={(e) => setMin(e.target.value)}
            onKeyDown={handleKeyDown}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <InputGroup w="20%" m="10px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.600"
            fontSize="1.2em"
            children="$"
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Max"
            value={max}
            borderWidth="1px"
            onChange={(e) => setMax(e.target.value)}
            onKeyDown={handleKeyDown}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <Flex alignItems="center">
          <Button colorScheme="blue" onClick={handleFilter}>
            Filter Results
          </Button>
          {filterApplied && (
            <Button
              variant={'ghost'}
              onClick={clearFilters}
              ml="5px"
              _hover={{ color: 'red' }}
            >
              <SmallCloseIcon mr="3px" />
              Clear Filters
            </Button>
          )}
        </Flex>
      </Box>

      <SimpleGrid p="20px" spacing="10" minChildWidth="300px">
        {filteredListings.map((listing) => {
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
      transition="box-shadow 0.3s ease"
      _hover={{
        boxShadow: 'lg',
      }}
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
