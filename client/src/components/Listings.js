import '../css/Listings.css';
import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { Search2Icon, AddIcon } from '@chakra-ui/icons';
// import campus from '../assets/ubc_campus.jpg';
import campus from '../assets/test2.jpg';

const Listings = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

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
    <Flex flexDirection="column" border="1px" position="relative">

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
          border="10px solid rgb(49, 130, 206)"
        >
          <InputLeftElement children={<Search2Icon color="gray.600" />} />
          <Input type="text" variant="filled" placeholder="Search listings" />
        </InputGroup>
      </Box>

      <SimpleGrid p="20px" spacing="10" minChildWidth="300px">
        {listings.map((listing) => {
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={campus} h="300px" w="full" objectFit="cover" />

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
                  {listing.name}
                </Box>

                <Box>
                  {listing.price}
                  <Box as="span" color="gray.600" fontSize="sm">
                    / month
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      <Box position="fixed" right="40px" bottom="30px">
        <Button colorScheme="blue" p="30px" borderRadius="30px">
            Add Listing
        </Button>
      </Box>
{/* 
      <Box
        position="fixed"
        w="100px"
        h="50px"
        bottom="30px"
        right="40px"
        // bg="rgb(49, 130, 206)"
        borderRadius="full"
        p="10px" // Optional padding to increase the size of the circle
        zIndex="1" // Optional zIndex to control the stacking order if needed
      >
        <Button>
          Add Listing
        </Button>
      </Box> */}

      {/* <div className="listing-container">
        <div className="navigator">
          <button className="plus" onClick={createNewListing} />
          <div className="options">
            <div className="option">
              <label htmlFor="search">Filter For a Listing</label>
              <input
                name="search"
                type="text"
                className="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="option">
              <label htmlFor="selector">Listing Type</label>
              <select
                className="selector"
                defaultValue={types.all}
                value={type}
                onChange={handleTypeChange}
              >
                <option value={types.all}>All</option>
                <option value={types.items}>Items</option>
                <option value={types.sublets}>Sublets</option>
              </select>
            </div>
            <div
              className="option"
              style={{ display: 'flex', marginTop: '10px' }}
            >
              <label htmlFor="price">Price:</label>
              <div>
                <input
                  type="number"
                  name="price"
                  min="0"
                  max="5000"
                  value={min}
                  step="100"
                  onChange={changeMin}
                />
                <label className="lab">Min</label>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={max}
                  step="100"
                  onChange={changeMax}
                />
                <label className="lab">Max</label>
              </div>
            </div>
          </div>
        </div>
        <div className="listings">
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
        </div>
      </div>
      <dialog data-modal id="create-new-listing-modal">
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
    <>
      <div className="listing" id={lid} onClick={handleClick}>
        <div className="listing-image">
          <img
            loading="lazy"
            src={`http://localhost:1234/images/${image}`}
            alt="Tallwood"
          />
        </div>
        <div className="listing-name">{name}</div>
        <div className="listing-username">Posted by {username}</div>
        <div className="listing-price">${price}</div>
      </div>
    </>
  );
};

export default Listings;
