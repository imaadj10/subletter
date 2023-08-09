import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Box, Text, Flex, VStack, HStack, Heading } from '@chakra-ui/react';

export default function Schools() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [topSchools, setTopSchools] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1234/schools/top', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTopSchools(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box>
      <VStack spacing="5px" mt="15px">
        <Heading>
            Top Schools by User Count
        </Heading>
        {topSchools.map((school) => {
          return (
            <Flex justifyContent="center">
              <HStack>
                <Text>{school.school_name}</Text>
                <Text>{school.user_count}</Text>
              </HStack>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
