import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/NewResidence.css';
import {
  Box,
  Input,
  Grid,
  FormControl,
  FormLabel,
  InputGroup,
  GridItem,
  Checkbox,
  InputLeftElement,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

export default function NewResidence({ props, isOpen, onOpen, onClose }) {
  const [res_name, setResidence] = useState();
  const [street_address, setAddress] = useState();
  const [postal_code, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [availableUnits, setAvailableUnits] = useState([]);
  const [unit_prices, setUnitPrices] = useState({});
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [file, setFile] = useState();

  const resetForm = () => {
    setResidence('');
    setAddress('');
    setPostalCode('');
    setCountry('');
    setCity('');
    setProvince('');
    setSelectedUnits([]);
    setUnitPrices({});
  };

  useEffect(() => {
    if (props.selectedResidence) {
      setResidence(props.selectedResidence.res_name);
      setAddress(props.selectedResidence.street_address);
      setPostalCode(props.selectedResidence.postal_code);
      setCountry(props.selectedResidence.country);
      setCity(props.selectedResidence.city);
      setProvince(props.selectedResidence.province);

      setSelectedUnits(parseTypesList(props.selectedResidence.types_list));

      setUnitPrices(parsePricesList(props.selectedResidence.prices_list));
    } else {
      resetForm();
    }
  }, [props.selectedResidence]);

  const parseTypesList = (unitsString) => {
    const unitsList = unitsString.split(',');
    return unitsList;
  };

  const parsePricesList = (pricesListString) => {
    const pricesListArray = pricesListString.split(',');
    const pricesDict = {};

    pricesListArray.forEach((item) => {
      const [unitType, price] = item.split(':');
      pricesDict[unitType] = price;
    });

    return pricesDict;
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('res_name', res_name);
    formData.append('street_address', street_address);
    formData.append('postal_code', postal_code);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('province', province);
    formData.append('unit_types', selectedUnits);
    formData.append('prices', JSON.stringify(unit_prices));
    formData.append('image', file);
    
    if (selectedUnits.length === 0) {
      alert('Please select at least one unit type!');
    } else {
      try {
        if (props.selectedResidence) {
          // If there's a selected residence, it means we are updating
          await axios
            .put(
              `http://localhost:1234/housinginfo/${props.selectedResidence.res_name}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${props.token}`,
                },
              }
            )
            .catch((e) => {
              alert(e.response.data.message);
            });
        } else {
          // If there's no selected residence, it means we are adding a new one
          await axios
            .post('http://localhost:1234/housinginfo', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${props.token}`,
              },
            })
            .catch((e) => {
              alert(e.response.data.message);
            });
        }
      } catch (error) {
        alert('Error adding/updating residence!');
      }

      onClose();
    }
  };

  async function getUnitTypes() {
    try {
      await axios
        .get('http://localhost:1234/units', {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then((res) => setAvailableUnits(res.data));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUnitTypes();
  }, []);

  const handleCheckboxChange = (unitType) => {
    setUnitPrices((prevPrices) => ({
      ...prevPrices,
      [unitType]: !prevPrices[unitType],
    }));

    setSelectedUnits((prevSelectedUnits) =>
      prevSelectedUnits.includes(unitType)
        ? prevSelectedUnits.filter((unit) => unit !== unitType)
        : [...prevSelectedUnits, unitType]
    );
  };

  const handlePriceChange = (unitType, price) => {
    setUnitPrices((prevPrices) => ({
      ...prevPrices,
      [unitType]: price,
    }));
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
  console.log(selectedUnits);

  return (
    <Modal
      blockScrollOnMount={false}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.selectedResidence ? 'Update Residence Information' : 'Add New Residence'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl isRequired>
                <FormLabel>Residence Name</FormLabel>
                <Input
                  type="text"
                  name="res_name"
                  value={res_name}
                  placeholder="eg. UBC Student Residence"
                  onChange={(e) => setResidence(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Street Address</FormLabel>
                <Input
                  type="text"
                  name="street_address"
                  value={street_address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>State/Province</FormLabel>
                <Input
                  type="text"
                  name="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Zip/Postal Code</FormLabel>
                <Input
                  type="text"
                  name="postal_code"
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <GridItem colSpan={2} />

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Available Units</FormLabel>
                </FormControl>
              </GridItem>
              {availableUnits.map((unit) => (
                <GridItem key={unit.type}>
                  <Checkbox
                    key={unit.type}
                    isChecked={selectedUnits.includes(unit.type)} // Set isChecked based on whether the unit is in the availableUnits list
                    onChange={() => handleCheckboxChange(unit.type)} // Pass the unit to the onChange handler
                  >
                    {unit.type}
                  </Checkbox>
                  {selectedUnits.includes(unit.type) && (
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
                        value={unit_prices[unit.type]}
                        placeholder="Enter unit rent"
                        w="70%"
                        onChange={(e) =>
                          handlePriceChange(unit.type, e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </InputGroup>
                  )}
                </GridItem>
              ))}
              <FormControl isRequired>
                <FormLabel htmlFor="imageInput">Upload Image</FormLabel>
                <Input
                  type="file"
                  id="imageInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ border: 'none' }}
                />
              </FormControl>
            </Grid>
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
          <Button colorScheme="blue" onClick={submit}>
            {props.selectedResidence ? 'Update Residence':'Add Residence'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
