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
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
const md = require('../assets/md.jpg');

const HousingInfo = () => {
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
    // <div>
    //   <h1> Housing Information </h1>
    //   <button className="plus" onClick={createNewResidence} />

    //   <div>
    //     <h2>Residence Ratings</h2>
    //     <div>
    //       {residenceRatings.map((res) => {
    //         return (
    //           <>
    //             <p>
    //               {res.res_name} : {Math.round(res.overall * 10) / 10}/10
    //             </p>
    //           </>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <div className="residences">
    //     {residences.map((residence) => {
    //       return (
    //         <Residence
    //           residence={residence}
    //           setSelectedResidence={setSelectedResidence}
    //         />
    //       );
    //     })}
    //   </div>
    //   <dialog data-modal id="create-new-residence-modal">
    //     <NewResidence
    //       props={{
    //         username,
    //         token,
    //         selectedResidence,
    //       }}
    //     />
    //   </dialog>
    // </div>
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
    </Flex>
  );
};

const Residence = ({ residence, setSelectedResidence, ratings }) => {
  const rating = ratings.find(
    (rating) => rating.res_name === residence.res_name
  );
  const overall =
    rating && rating.overall !== undefined
      ? Math.round(rating.overall * 10) / 20
      : 0;
  // const navigate = useNavigate();

  // const handleClick = (e) => {
  //   const name = residence.res_name;
  //   navigate(`${name}`);
  // };

  // const updateResidence = (residence) => {
  //   setSelectedResidence(residence);
  //   document.getElementById('create-new-residence-modal').showModal();
  // };
  // return (
  //   <div className="residence" key={residence.res_name} onClick={handleClick}>
  //     <h1>{residence.res_name}</h1>
  //     <button className="update" onClick={() => updateResidence(residence)}>
  //       Update
  //     </button>
  //     <div className="address-container">
  //       <h3>{residence.street_address}</h3>
  //       <h3>{residence.postal_code}</h3>
  //     </div>
  //   </div>
  // );
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '300px', md: '400px', lg: '500px' }}
        src={md}
        alt="Residence"
      />

      <Stack>
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
          {residence.types_list.split(',').map((unit) => (
            <Image
            src={`http://localhost:1234/images/units/${unit}.png`}
            maxW="100%"
            objectFit="contain"
            alt={unit}
            margin="10px"
          />
          ))}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default HousingInfo;
