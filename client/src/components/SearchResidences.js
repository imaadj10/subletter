import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Heading,
  Checkbox,
  Button,
} from '@chakra-ui/react';

export default function SearchResidences() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [attributes, setAttributes] = useState([]);
  const [results, setResults] = useState([]);

  const handleCheckboxChange = (attribute) => {
    setAttributes((prevAttributes) => {
      // Check if the attribute is already in the array
      const isAttributePresent = prevAttributes.includes(attribute);

      if (isAttributePresent) {
        // If attribute is present, remove it from the array
        return prevAttributes.filter((attr) => attr !== attribute);
      } else {
        // If attribute is not present, add it to the array
        return [...prevAttributes, attribute];
      }
    });
  };

  const getResidences = async () => {
    if (attributes.length === 0) {
      alert('Please select at least one attribute!');
    } else {
      await axios
        .post(
          'http://localhost:1234/tophousing',
          { attributes: attributes },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setResults(res.data[0]);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  return (
    <Box>
      <VStack spacing="5px" mt="15px">
        <Heading>Select Attributes</Heading>
        <HStack>
          <Checkbox
            key="res_name"
            onChange={() => handleCheckboxChange('res_name')}
          >
            res_name
          </Checkbox>
          <Checkbox
            key="school_name"
            onChange={() => handleCheckboxChange('school_name')}
          >
            school_name
          </Checkbox>
          <Checkbox
            key="street_address"
            onChange={() => handleCheckboxChange('street_address')}
          >
            street_address
          </Checkbox>
          <Checkbox
            key="postal_code"
            onChange={() => handleCheckboxChange('postal_code')}
          >
            postal_code
          </Checkbox>
          <Checkbox
            key="country"
            onChange={() => handleCheckboxChange('country')}
          >
            country
          </Checkbox>
        </HStack>
        <Button onClick={getResidences}>Get Results!</Button>
      </VStack>
      {results && results.length > 0 && (
        <Box mt="20px">
          <VStack spacing="10px">
          <Heading as="h2" size="md">
            Results:
          </Heading>
            {results.map((result, index) => (
              <Box key={index}>
                {/* Render the specific attributes you want to display */}
                <p>res_name: {result.res_name}</p>
                <p>school_name: {result.school_name}</p>
                <p>street_address: {result.street_address}</p>
                <p>postal_code: {result.postal_code}</p>
                <p>country: {result.country}</p>
                {/* Add more attributes as needed */}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
