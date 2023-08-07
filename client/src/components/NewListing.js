import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Listings.css';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
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
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

export default function NewListing({ props, isOpen, onOpen, onClose }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [housingInfo, setHousingInfo] = useState([]);
  const [file, setFile] = useState();
  const toast = useToast();

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

    onClose();
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === 69 || // 'e' key
      e.keyCode === 187 || // '+' key
      e.keyCode === 189 // '-' key
    ) {
      e.preventDefault(); // Prevent the input of these characters
    }
  };

  let inputSection;
  if (type === 'item') {
    inputSection = (
      /* JSX for the input section when type is "Items" */
      <Box w="full">
        <FormControl isRequired>
          <FormLabel>Item Quantity:</FormLabel>
          <NumberInput
            min="1"
            variant="filled"
            value={quantity}
            onChange={(valueString) => setQuantity(valueString)}
            onKeyDown={handleKeyDown}
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
        <FormControl isRequired>
          <FormLabel>Residence:</FormLabel>
          <Select
            placeholder="Select Residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            variant="filled"
          >
            {housingInfo.map((housing) => {
              return <option key={housing.id}>{housing.res_name}</option>;
            })}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Unit Type:</FormLabel>
          <Select
            placeholder="Select Unit Type"
            value={unitType}
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

  return (
    <Modal
      blockScrollOnMount={false}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack spacing="5">
              <FormControl isRequired>
                <FormLabel>Select Listing Type</FormLabel>
                <Select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  variant="filled"
                >
                  <option value="sublet">Sublet</option>
                  <option value="item">Item</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Listing Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={name}
                  placeholder="eg. Studio Sublet at Marine Drive"
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Listing Price</FormLabel>
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

              <FormControl isRequired>
                <FormLabel>Listing Details</FormLabel>
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

              <FormControl isRequired>
                <FormLabel htmlFor="imageInput">Upload Image</FormLabel>
                <Input
                  type="file"
                  id="imageInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ border: 'none' }}
                />
              </FormControl>
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="right">
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            border="2px solid rgb(49, 130, 206)"
          >
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={(e) => {
              submit(e);
              toast({
                title: props.listing? 'Listing Updated!' : 'Listing Added!',
                description: props.listing? `${name} has been updated!` : `${name} has been added!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }}>
            {props.listing? 'Update Listing' : 'Add Listing'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
