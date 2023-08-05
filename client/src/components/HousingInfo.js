import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/Housing.css';
import NewResidence from './NewResidence';
import {
  Flex,
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Stack,
  Text,
  Heading,
  Divider,
  Icon,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { StarIcon, AddIcon } from '@chakra-ui/icons';
const md = require('../assets/md.jpg');

const HousingInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [residences, setResidences] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [residenceRatings, setResidenceRatings] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

  async function getHousingInfo() {
    try {
      await axios
        .get('http://localhost:1234/housinginfo', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setResidences(res.data);
        })
        .catch((e) => console.log('error fetching residences'));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getHousingInfo();
    getResidenceRatings();
    console.log(residenceRatings);
  }, []);

  const getResidenceRatings = async () => {
    await axios
      .get('http://localhost:1234/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setResidenceRatings(res.data));
  };

  const createNewResidence = () => {
    setSelectedResidence(null);
    document.getElementById('create-new-residence-modal').showModal();
  };

  return (
    <Flex flexDirection="column" maxW="75%" mx="auto">
      <Stack spacing="10" p="20px">
        {residences.map((residence) => (
          <Residence
            key={residence.res_name}
            residence={residence}
            setSelectedResidence={setSelectedResidence}
            ratings={residenceRatings}
          />
        ))}
      </Stack>
      <Box position="fixed" right="40px" bottom="30px">
        <Button colorScheme="blue" p="30px" borderRadius="30px" onClick={onOpen}>
          <Flex align="center">
            <Icon as={AddIcon} boxSize={4} mr="2" />
            Add Residence
          </Flex>
        </Button>
      </Box>

      <Modal
        blockScrollOnMount={false}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewResidence
              props={{
                username,
                token,
                selectedResidence,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add Residence</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const Residence = ({ residence, ratings }) => {
  const rating = ratings.find(
    (rating) => rating.res_name === residence.res_name
  );
  const overall =
    rating && rating.overall !== undefined
      ? Math.round(rating.overall * 10) / 20
      : 0;

  const prices_list = residence.prices_list
    .split(',')
    .reduce((acc, priceItem) => {
      const [unitType, price] = priceItem.split(':');
      acc[unitType.trim()] = parseInt(price, 10);
      return acc;
    }, {});

  const unitPrices = residence.types_list
    .split(',')
    .map((unit) => prices_list[unit.trim()]);
  const minPrice = Math.min(...unitPrices);
  const maxPrice = Math.max(...unitPrices);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = residence.res_name;
    navigate(`${name}`);
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      onClick={handleClick}
      cursor="pointer"
    >
      <Image
        objectFit="cover"
        h="300px"
        w="400px"
        src={`http://localhost:1234/images/residences/${residence.image}`}
        alt="Residence"
      />

      <Stack w="full">
        <Text
          position="absolute"
          top="0"
          right="0"
          p="2"
          fontSize="sm"
          fontWeight="bold"
        >
          ${minPrice} - ${maxPrice}/month
        </Text>
        <CardBody>
          <Heading size="md">{residence.res_name}</Heading>
          {[...Array(Math.floor(overall))].map((_, index) => (
            <StarIcon key={index} color="yellow.400" />
          ))}
          {overall - Math.floor(overall) >= 0.5 && (
            <StarIcon color="yellow.400" />
          )}
          {[...Array(5 - Math.ceil(overall))].map((_, index) => (
            <StarIcon key={index} color="gray.300" />
          ))}
          <Text py="2">
            {residence.street_address}, {residence.city}, {residence.province}{' '}
            {residence.postal_code}
          </Text>
        </CardBody>
        <Divider my="2" width="100%" borderWidth="2px" />
        <CardFooter>
          {residence.types_list.split(',').map((unit, index) => (
            <div key={index}>
              <Image
                src={`http://localhost:1234/images/units/${unit}.png`}
                maxW="100%"
                objectFit="contain"
                alt={unit}
                margin="10px"
              />
            </div>
          ))}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default HousingInfo;
