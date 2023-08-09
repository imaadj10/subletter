import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Box, Text } from '@chakra-ui/react';

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
    <>
      {topSchools.map((school) => {
        return (
          <Box display="flex">
            <Text>{school.school_name}</Text>
            <Text>{school.user_count}</Text>
          </Box>
        );
      })}
    </>
  );
}
