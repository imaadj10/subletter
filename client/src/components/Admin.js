import React from 'react';
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
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const PersonContext = React.createContext();

export default function Admin() {
  const cookies = new Cookies();
  const [table, setTable] = useState('');
  return (
    <>
      <PersonContext.Provider value={{ token: cookies.get('TOKEN') }}>
        <Heading p="1rem">Select your tables and conditions!</Heading>
        <FormControl isRequired p="1rem">
          <Select
            variant="filled"
            placeholder="select your table from below"
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
  const [min, setMin] = useState(0);
  const [info, setInfo] = useState([]);
  const [attributes, setAttributes] = useState([]);

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

  const handleClick = async () => {
    if (attributes.length === 0) {
      alert('Please select at least one attribute!');
    } else {
      await axios
        .post(
          'http://localhost:1234/admin/listings',
          { attributes, username, name, description, min },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setInfo(res.data[0]);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };
  return (
    <Box p="1rem">
      <Text>Listings</Text>
      <HStack>
        <Checkbox
          key="username"
          onChange={() => handleCheckboxChange('username')}
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
          key="description"
          onChange={() => handleCheckboxChange('description')}
        />
        <Input
          placeholder="description"
          value={description}
          defaultChecked
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox key="name" onChange={() => handleCheckboxChange('name')} />
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Text>Min</Text>
        <Input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Text>Price?</Text>
        <Checkbox key="price" onChange={() => handleCheckboxChange('price')} />
      </HStack>
      <Button onClick={handleClick}>Query Me!</Button>
      {info && (
        <Box>
          {info.map((info) => {
            return (
              <Box p="1rem">
                {attributes.includes('username') && (
                  <p>username: {info.username}</p>
                )}
                {attributes.includes('description') && (
                  <p>description: {info.description}</p>
                )}
                {attributes.includes('name') && <p>name: {info.name}</p>}
                {attributes.includes('price') && <p>price: {info.price}</p>}
              </Box>
            );
          })}
        </Box>
      )}
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
  const [attributes, setAttributes] = useState([]);

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

  const handleClick = async () => {
    if (attributes.length === 0) {
      alert('Please select at least one attribute!');
    } else {
      await axios
        .post(
          'http://localhost:1234/admin/users',
          { attributes, username, name, school, description },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setInfo(res.data[0]);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  return (
    <Box p="1rem">
      <Text>Users</Text>
      <HStack>
        <Checkbox
          key="username"
          onChange={() => handleCheckboxChange('username')}
        />
        <Input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox key="name" onChange={() => handleCheckboxChange('name')} />
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="school_name"
          onChange={() => handleCheckboxChange('school_name')}
        />
        <Input
          placeholder="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="description"
          onChange={() => handleCheckboxChange('description')}
        />
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </HStack>
      <Button onClick={handleClick}>Query Me!</Button>
      {info && (
        <Box>
          {info.map((info) => {
            return (
              <Box p="1rem">
                {attributes.includes('username') && (
                  <p>username: {info.username}</p>
                )}
                {attributes.includes('name') && <p>name: {info.name}</p>}
                {attributes.includes('school_name') && (
                  <p>school: {info.school_name}</p>
                )}
                {attributes.includes('description') && (
                  <p>description: {info.description}</p>
                )}
              </Box>
            );
          })}
        </Box>
      )}
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
  const [attributes, setAttributes] = useState([]);

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

  const handleClick = async () => {
    if (attributes.length === 0) {
      alert('Please select at least one attribute!');
    } else {
      await axios
        .post(
          'http://localhost:1234/admin/residences',
          {
            attributes,
            resName,
            schoolName,
            streetAddress,
            postalCode,
            country,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setInfo(res.data[0]);
          console.log(res.data[0]);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  return (
    <Box p="1rem">
      <Text>Residences</Text>
      <HStack>
        <Checkbox
          key="res_name"
          onChange={() => handleCheckboxChange('res_name')}
        />
        <Input
          placeholder="resName"
          value={resName}
          onChange={(e) => setResName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="school_name"
          onChange={() => handleCheckboxChange('school_name')}
        />
        <Input
          placeholder="schoolName"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="street_address"
          onChange={() => handleCheckboxChange('street_address')}
        />
        <Input
          placeholder="streetAddress"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="postal_code"
          onChange={() => handleCheckboxChange('postal_code')}
        />
        <Input
          placeholder="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        ></Input>
      </HStack>
      <HStack>
        <Checkbox
          key="country"
          onChange={() => handleCheckboxChange('country')}
        />
        <Input
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></Input>
      </HStack>
      <Button onClick={handleClick}>Query Me!</Button>
      {info && (
        <Box>
          {info.map((info) => {
            return (
              <Box p="1rem">
                {attributes.includes('res_name') && (
                  <p>Residence Name: {info.res_name}</p>
                )}
                {attributes.includes('school_name') && (
                  <p>School Name: {info.school_name}</p>
                )}
                {attributes.includes('street_address') && (
                  <p>Street Address: {info.street_address}</p>
                )}
                {attributes.includes('postal_code') && (
                  <p>Postal Code: {info.postal_code}</p>
                )}
                {attributes.includes('country') && (
                  <p>Country: {info.country}</p>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
