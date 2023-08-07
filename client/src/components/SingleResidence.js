import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Text,
  Box,
  Image,
  Flex,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { StarIcon, InfoIcon } from '@chakra-ui/icons';
import Cookies from 'universal-cookie';
import '../css/Housing.css';

export default function SingleResidence() {
  const resName = window.location.pathname.split('/')[2];
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [residence, setResidence] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getResidence();
    getResidenceReviews();
  }, []);

  async function getResidence() {
    await axios
      .get(`http://localhost:1234/housinginfo/${resName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        setUnitTypes(res.data);
        setResidence(res.data[0]);
      })
      .catch((e) => console.log(e));
  }

  async function getResidenceReviews() {
    await axios
      .get(`http://localhost:1234/reviews/${resName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOverallRating(Math.round(res.data.rating.overall * 10) / 10);
        setReviews(res.data.reviews);
      })
      .catch((e) => console.log(e));
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview) return;
    axios
      .post(
        `http://localhost:1234/reviews/${resName}`,
        { content: newReview, rating: rating },
        axiosConfig
      )
      .then((res) => {
        getResidenceReviews();
      })
      .catch((e) => console.log(e));
    setIsReview(false);
    setNewReview('');
    setRating(0);
  };

  return (
    <>
      <Box maxWidth="1000px" margin="auto" p="1rem" overflowX="hidden">
        <Text fontWeight="bold" maxWidth="1000px" fontSize="3xl">
          {residence.res_name} at the {residence.school_name}
        </Text>
        <Rating overall={overallRating / 2} />
        <Flex marginBlock="1rem">
          <InfoIcon margin="1rem" size="9xl" />
          <Box>
            <Text>{residence.street_address}</Text>
            <Text>
              {residence.city}, {residence.province}, {residence.country},{' '}
              {residence.postal_code}
            </Text>
          </Box>
        </Flex>
        <Image
          objectFit="cover"
          width="1000px"
          src={`http://localhost:1234/images/residences/${residence.image}`}
          alt="Residence"
          marginBottom="1rem"
        />
        <Box borderRadius="3rem" p="1rem">
          <Text
            mb="1rem"
            bg="blue.100"
            borderRadius="1.5rem"
            p="1rem"
            textAlign="center"
            fontWeight="bold"
            fontSize="xl"
          >
            Unit Types
          </Text>
          <Flex
            flexWrap="wrap"
            gap="2rem"
            textAlign="center"
            justify="space-around"
          >
            {unitTypes.map((unit) => {
              return (
                <>
                  <Box>
                    <Image
                      _hover={{
                        transition: '200ms',
                        transform: 'scale(1.02)',
                        cursor: 'pointer',
                      }}
                      src={`http://localhost:1234/images/units/${unit.type}.png`}
                      maxW="100%"
                      objectFit="contain"
                      alt={unit}
                      margin="10px"
                    />
                    <Text>${unit.price} / month</Text>
                  </Box>
                </>
              );
            })}
          </Flex>
        </Box>
        <Box>
          <Text
            mb="1rem"
            bg="blue.100"
            borderRadius="1.5rem"
            p="1rem"
            textAlign="center"
            fontWeight="bold"
            fontSize="xl"
          >
            Reviews
          </Text>

          {!isReview ? (
            <Button
              transform="translateX(-50%)"
              left="50%"
              marginBlock="1rem"
              colorScheme="blue"
              onClick={() => setIsReview(true)}
            >
              Add a review...
            </Button>
          ) : (
            <form onSubmit={submitReview}>
              <Text fontWeight="semibold" fontSize="lg">
                Add Review
              </Text>
              <Textarea
                placeholder="Write a review..."
                value={newReview}
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <Text fontWeight="semibold" fontSize="lg">
                Rating (out of 10)
              </Text>
              <NumberInput
                value={rating}
                onChange={(valueString) => setRating(parseInt(valueString))}
                width="100px"
                defaultValue="10"
                min="0"
                max="10"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Flex p="1rem" justifyContent="center" gap="2rem">
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setIsReview(false);
                    setNewReview('');
                    setRating(0);
                  }}
                >
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit" onClick={submitReview}>
                  Post
                </Button>
              </Flex>
            </form>
          )}

          <Flex flexWrap="wrap" gap="1rem" justifyContent="center">
            {reviews.map((review) => {
              return (
                <Review
                  key={review.rid}
                  review={review}
                  cookies={cookies}
                  getResidenceReviews={getResidenceReviews}
                />
              );
            })}
          </Flex>
        </Box>
      </Box>
    </>
  );
}

const Review = ({ review, cookies, getResidenceReviews }) => {
  const deleteReview = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:1234/reviews/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get('TOKEN')}`,
        },
      })
      .then((res) => getResidenceReviews())
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Flex
        width="45%"
        justifyContent="space-between"
        p="1rem"
        borderRadius="1rem"
        bg="gray.100"
      >
        <Box>
          <Text fontWeight="semibold" fontSize="xl">
            {review.username}
          </Text>
          <Rating overall={review.rating / 2} />
          <Text mt="0.5rem">{review.description}</Text>
        </Box>
        {review.username === cookies.get('USERNAME') && (
          <Button
            minWidth="fit-content"
            colorScheme="red"
            onClick={deleteReview}
            id={review.rid}
          >
            Delete
          </Button>
        )}
      </Flex>
    </>
  );
};

const Rating = ({ overall }) => {
  return (
    <>
      {[...Array(Math.floor(overall))].map((_, index) => (
        <StarIcon key={index} color="yellow.400" />
      ))}
      {overall - Math.floor(overall) >= 0.5 && <StarIcon color="yellow.400" />}
      {[...Array(5 - Math.ceil(overall))].map((_, index) => (
        <StarIcon key={index} color="gray.300" />
      ))}
    </>
  );
};
