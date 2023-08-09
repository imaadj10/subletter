import { useState, useContext } from 'react';
import {
  Button,
  FormControl,
  Input,
  Select,
  Text,
  Box,
  Checkbox,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import react from 'react';
import Cookies from 'universal-cookie';

const PersonContext = react.createContext();

export default function Admin() {
  const cookies = new Cookies();
  const [table, setTable] = useState('');
  return (
    <>
      <PersonContext.Provider value={{ token: cookies.get('TOKEN') }}>
        <FormControl isRequired p="1rem">
          <Select
            variant="filled"
            placeholder="select table"
            onChange={(e) => setTable(e.target.value)}
          >
            <option>listings</option>
            <option>users</option>
            <option>residences</option>
          </Select>
          {table === 'listings' && <Listings />}
          {table === 'users' && <Users />}
          {table === 'residences' && <Residences />}
        </FormControl>
      </PersonContext.Provider>
    </>
  );
}

const Listings = () => {
  const { token } = useContext(PersonContext);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  // const [minPrice, setMinPrice] = useState();
  // const [maxPrice, setMaxPrice] = useState();

  const [isUsername, setIsUsername] = useState(true);
  const [isDescription, setIsDescription] = useState(true);
  const [isName, setIsName] = useState(true);
  // const [isMinPrice, setIsMinPrice] = useState(true);
  // const [isMaxPrice, setIsMaxPrice] = useState(true);

  const [info, setInfo] = useState();

  const handleClick = async () => {
    axios
      .get(`http://localhost:1234/admin/listings`, {
        params: {
          username: { username, isUsername },
          description: { description, isDescription },
          name: { name, isName },
          // minPrice: { minPrice, isMinPrice },
          // maxPrice: { maxPrice, isMaxPrice },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInfo(res.data));
  };

  return (
    <Box p="1rem">
      <Text>Listings</Text>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isUsername}
          defaultChecked
          onChange={() => setIsUsername(!isUsername)}
        />
        <Input
          placeholder="username"
          value={username}
          defaultChecked
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isDescription}
          defaultChecked
          onChange={() => setIsDescription(!isDescription)}
        />
        <Input
          placeholder="description"
          value={description}
          defaultChecked
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isName}
          defaultChecked
          onChange={() => setIsName(!isName)}
        />
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </HStack>
      {/* <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isMinPrice}
          defaultChecked
          onChange={() => setIsMinPrice(!isMinPrice)}
        />
        <Input
          type="number"
          placeholder="min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isMaxPrice}
          defaultChecked
          onChange={() => setIsMaxPrice(!isMaxPrice)}
        />
        <Input
          type="number"
          placeholder="maxPrice"
          value={maxPrice}
          defaultChecked
          onChange={(e) => setMaxPrice(e.target.value)}
        ></Input>
      </HStack> */}
      <Button onClick={handleClick}>Query Me!</Button>
      {info && <Box as="h2">Query Information</Box>}
    </Box>
  );
};
const Users = () => {
  const { token } = useContext(PersonContext);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState();

  const [isUsername, setIsUsername] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isSchool, setIsSchool] = useState(true);
  const [isDescription, setIsDescription] = useState(true);

  const handleClick = async () => {
    axios
      .get(`http://localhost:1234/admin/users`, {
        params: {
          username: { username, isUsername },
          name: { name, isName },
          school: { school, isSchool },
          description: { description, isDescription },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInfo(res.data));
  };

  return (
    <Box p="1rem">
      <Text>Users</Text>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isUsername}
          defaultChecked
          onChange={() => setIsUsername(!isUsername)}
        />
        <Input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isName}
          defaultChecked
          onChange={() => setIsName(!isName)}
        />
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isSchool}
          defaultChecked
          onChange={() => setIsSchool(!isSchool)}
        />
        <Input
          placeholder="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isDescription}
          defaultChecked
          onChange={() => setIsDescription(!isDescription)}
        />
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </HStack>
      <Button onClick={handleClick}>Query Me!</Button>
      {info && <Box as="h2">Query Information</Box>}
    </Box>
  );
};
const Residences = () => {
  const { token } = useContext(PersonContext);
  const [resName, setResName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [info, setInfo] = useState();

  const [isResName, setIsResName] = useState(true);
  const [isSchoolName, setIsSchoolName] = useState(true);
  const [isStreetAddress, setIsStreetAddress] = useState(true);
  const [isPostalCode, setIsPostalCode] = useState(true);
  const [isCountry, setIsCountry] = useState(true);

  const handleClick = async () => {
    axios
      .get(`http://localhost:1234/admin/residences`, {
        params: {
          resName: { resName, isResName },
          schoolName: { schoolName, isSchoolName },
          streetAddress: { streetAddress, isStreetAddress },
          postalCode: { postalCode, isPostalCode },
          country: { country, isCountry },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInfo(res.data));
  };

  return (
    <Box p="1rem">
      <Text>Residences</Text>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isResName}
          defaultChecked
          onChange={() => setIsResName(!isResName)}
        />
        <Input
          placeholder="resName"
          value={resName}
          onChange={(e) => setResName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isSchoolName}
          defaultChecked
          onChange={() => setIsSchoolName(!isSchoolName)}
        />
        <Input
          placeholder="schoolName"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isStreetAddress}
          defaultChecked
          onChange={() => setIsStreetAddress(!isStreetAddress)}
        />
        <Input
          placeholder="streetAddress"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isPostalCode}
          defaultChecked
          onChange={() => setIsPostalCode(!isPostalCode)}
        />
        <Input
          placeholder="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          size="md"
          colorScheme="green"
          checked={isCountry}
          defaultChecked
          onChange={() => setIsCountry(!isCountry)}
        />
        <Input
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></Input>
      </HStack>
      <Button onClick={handleClick}>Query Me!</Button>
      {info && <Box as="h2">Query Information</Box>}
    </Box>
  );
};
