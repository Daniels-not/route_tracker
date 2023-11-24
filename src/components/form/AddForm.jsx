import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Select,
    useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import { getCurrentUser, signOut } from '../../func/auth';
import AddRouteFunc from '../../func/AddRoute'
import RouteTable from '../table/RouteTable'


const sectorsWithPrices = [
  { name: 'Santo Domingo Este', price: 100 },
  { name: 'Santo Domingo Oeste', price: 120 },
  { name: 'Santo Domingo Norte', price: 110 },
  { name: 'Los Alcarrizos', price: 90 },
  { name: 'San Isidro', price: 95 },
  { name: 'Villa Mella', price: 105 },
  // Add more sectors in Santo Domingo with corresponding prices

  { name: 'Santiago de los Caballeros', price: 150 },
  { name: 'Bella Vista', price: 140 },
  { name: 'Gurabo', price: 130 },
  { name: 'Licey al Medio', price: 120 },
  { name: 'Tamboril', price: 110 },
  // Add more sectors in Santiago with corresponding prices

  { name: 'San Pedro de Macorís', price: 110 },
  { name: 'Juan Dolio', price: 130 },
  { name: 'Guayacanes', price: 120 },
  // Add more sectors in San Pedro de Macorís with corresponding prices

  { name: 'La Romana', price: 120 },
  { name: 'Villa Hermosa', price: 115 },
  // Add more sectors in La Romana with corresponding prices

  { name: 'Higüey', price: 130 },
  { name: 'Punta Cana', price: 140 },
  { name: 'Bávaro', price: 135 },
  // Add more sectors in La Altagracia with corresponding prices

  // Add more provinces and sectors as needed
];

export const AddForm = () => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const imageRef = useRef();
  const [user, setUser] = useState(null); 
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSectorPrice, setSelectedSectorPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        swal({
          title: "Oops!",
          text: `Error obtaining user: ${error.message}`,
          icon: "error",
          button: "Continue",
        });
      }
    };    

    fetchCurrentUser();
  }, []);
  const handleClick = async () => {
    try {
      setLoading(true);
      if (selectedSector && imageRef.current && imageRef.current.files[0]) {
        await AddRouteFunc(selectedSector,  
                            selectedSectorPrice, 
                            imageRef.current.files[0], 
                            user);
      } else {
        swal({
          title: "Algo ha saldio mal",
          text: `Tienes que agregar la imagen de la hoja de ruta`,
          icon: "error",
          button: "Continue",
        });
      }
    } catch (e) {
      swal({
        title: "Ooops! Something went wrong",
        text: `${e.message}`,
        icon: "error",
        button: "Continue",
      });
    } finally {
      setLoading(false);
      navigate('/dashboard');
    }
  };

  const handleSectorChange = (e) => {
    try {
      const selectedSectorName = e.target.value;
      setSelectedSector(selectedSectorName);
      console.log(selectedSectorName);
  
      const selectedPrice = sectorsWithPrices.find((sector) => sector.name === selectedSectorName)?.price;
  
      if (selectedPrice === undefined) {
        // Handle the case where the selected sector name doesn't match any in the array
        console.error(`No price found for sector: ${selectedSectorName}`);
      } else {
        setSelectedSectorPrice(selectedPrice);
        console.log(selectedPrice);
      }
    } catch (error) {
      // Handle any other errors that might occur
      console.error();
      swal({
        title: "Algo ha saldio mal",
        text: `An error occurred while handling sector change: ${error.message}`,
        icon: "error",
        button: "Continue",
      });
    }
  };
  
  return (
    <div>
        <Flex minH={'80vh'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Añadir Nueva Ruta</Heading>
            </Stack>
            <Box rounded={'lg'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="sector">
                  <FormLabel>Sector</FormLabel>
                    <Select
                      placeholder="Selecciona un sector"
                      value={selectedSector}
                      onChange={handleSectorChange}
                    >
                      {sectorsWithPrices.map((sector) => (
                        <option key={sector.name} value={sector.name}>
                          {sector.name}
                        </option>
                      ))}
                    </Select>
                </FormControl>
                {/* <FormControl id="name">
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" ref={nameRef} />
                </FormControl> */}
                {/* Additional form controls go here */}
                <FormControl id="image">
                  <FormLabel>Imagen</FormLabel>
                  <Input type="file" ref={imageRef} />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={handleClick}
                  >
                    Añadir
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <RouteTable />
      </div>
    );
  };
  