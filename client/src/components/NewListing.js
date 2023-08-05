import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Listings.css';
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
} from '@chakra-ui/react';

export default function NewListing({ props }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [file, setFile] = useState();

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
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          className="big-text-field"
          name="quantity"
          min="1"
          step="1"
          type="number"
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
      </div>
    );
  } else if (type === 'sublet') {
    inputSection = (
      /* JSX for the input section when type is "Sublets" */
      <div>
        <label htmlFor="unitType">Unit Type</label>
        <input
          className="big-text-field"
          name="unitType"
          type="text"
          value={unitType}
          placeholder="Unit Type"
          onChange={(e) => setUnitType(e.target.value)}
        ></input>
        <label htmlFor="residence">Residence Name</label>
        <input
          className="big-text-field"
          name="residence"
          type="text"
          value={residence}
          placeholder="Residence Name"
          onChange={(e) => setResidence(e.target.value)}
        ></input>
      </div>
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
