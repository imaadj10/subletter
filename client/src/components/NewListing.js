import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Listings.css';
import { v4 as uuidv4 } from 'uuid';
import {
  Text,
  Box,
  Flex,
  Button,
  HStack,
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';

export default function NewListing({ props }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [housingInfo, setHousingInfo] = useState([]);
  const [file, setFile] = useState();

  useEffect(() => {
    const getHousingInfo = async () => {
      try {
        await axios
          .get('http://localhost:1234/housinginfo', {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            const modifiedData = res.data.map((housing) => ({
              ...housing,
              id: uuidv4(),
            }));
            setHousingInfo(modifiedData);
            console.log(modifiedData);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getHousingInfo();
  }, []);

  useEffect(() => {
    if (props.listing) {
      setName(props.listing.name);
      setPrice(props.listing.price);
      setDescription(props.listing.description);
      setType(props.listing.type);
      setQuantity(props.listing.quantity);
      setUnitType(props.listing.unit);
      setResidence(props.listing.res_name);
    }
  }, [props.listing]);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('quantity', quantity);
    formData.append('unitType', unitType);
    formData.append('residence', residence);
    formData.append('image', file);

    if (props.listing) {
      console.log(formData);
      axios.put(
        `http://localhost:1234/listings/${props.listing.lid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
    } else {
      axios.post('http://localhost:1234/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${props.token}`,
        },
      });
    }

    closeModal(e);
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('create-new-listing-modal').close();
  };

  let inputSection;
  if (type === 'item') {
    inputSection = (
      /* JSX for the input section when type is "Items" */
      <Box w="full">
        <FormControl>
          <FormLabel>Item Quantity:</FormLabel>
          <NumberInput
            min="1"
            variant="filled"
            value={quantity}
            onChange={(valueString) => setQuantity(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Box>
    );
  } else if (type === 'sublet') {
    inputSection = (
      /* JSX for the input section when type is "Sublets" */
      <Box w="full">
        <FormControl>
          <FormLabel>Residence:</FormLabel>
          <Select
            placeholder="Select Residence"
            onChange={(e) => setResidence(e.target.value)}
            variant="filled"
          >
            {housingInfo.map((housing) => {
              return <option key={housing.id}>{housing.res_name}</option>;
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Unit Type:</FormLabel>
          <Select
            placeholder="Select Unit Type"
            onChange={(e) => {
              setUnitType(e.target.value);
            }}
            variant="filled"
          >
            {housingInfo
              .find((housing) => housing.res_name === residence)
              ?.types_list.split(',')
              .map((unit, index) => (
                <option key={index}>{unit}</option>
              ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

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
    <Box>
      <VStack>
        <FormControl>
          <FormLabel>Select Listing Type:</FormLabel>
          <Select
            onChange={(e) => setType(e.target.value)}
            value={type}
            variant="filled"
          >
            <option value="sublet">Sublet</option>
            <option value="item">Item</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Listing Name:</FormLabel>
          <Input
            type="text"
            name="username"
            value={name}
            placeholder="eg: Studio Sublet at Marine Drive"
            onChange={(e) => setName(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Listing Price:</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              type="number"
              min="0"
              variant="filled"
              value={price}
              placeholder="Enter listing price"
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Listing Details:</FormLabel>
          <Textarea
            type="text"
            variant="filled"
            placeholder="Write a detailed description of your listing..."
            size="md"
            resize="vertical"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        {inputSection}
      </VStack>
      {/* <form onSubmit={submit}>
        <label htmlFor="name">Listing Name</label>
        <input
          className="big-text-field"
          name="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="price">Price</label>
        <input
          className="big-text-field"
          name="price"
          type="number"
          min="0"
          placeholder="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <label htmlFor="name">Description</label>
        <textarea
          className="big-text-field"
          name="description"
          type="text"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a detailed description of your listing..."
        ></textarea>

        {props.listing ? null : (
          <>
            <label htmlFor="type">Type</label>
            <select
              className="selector"
              name="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="sublet">Sublet</option>
              <option value="item">Item</option>
            </select>
          </>
        )}
        {inputSection}
        <label for="image">Image</label>
        <input
          id="input"
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>

        <div className="new-listing-buttons">
          <button className="red" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form> */}
    </Box>
  );
}
