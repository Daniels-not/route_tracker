  // src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from '../func/auth';
import { useNavigate } from 'react-router-dom';
import { AddForm } from './form/AddForm';
import { FaRoute } from 'react-icons/fa'; 
import { db } from '../db/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
    useColorModeValue,
    Spacer
} from '@chakra-ui/react';
let counterRoute = 0
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [totalPrecio, setTotalPrecio] = useState(0);

    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          swal({
            title: "Oops!",
            text: `Error enviando los datos al servidor: ${error.message}`,
            icon: "error",
            button: "Continue",
          });
        }
      };

      fetchCurrentUser();
    }, []);

        // Fetch and sum the 'precio' values
        useEffect(() => {
          const fetchAndSumPrecios = async () => {
            try {
              const routesRef = collection(db, 'routes');
              const querySnapshot = await getDocs(routesRef);
        
              let total = 0;
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.precio) {
                  total += data.precio;
                }
                counterRoute += 1
              });

              setTotalPrecio(total);
              console.log(counterRoute)
            } catch (error) {
              swal({
                title: "Oops!",
                text: `Error al sumar las rutas: ${error.message}`,
                icon: "error",
                button: "Continue",
              });
            }
          };
        
          fetchAndSumPrecios();
        }, []);

    const handleSignOut = async () => {
      try {
        await signOut();
        navigate('/signin');
        swal({
          title: "Seccion iniciada correctamente!",
          text: `Bienvenido ${user.email}!`,
          icon: "success",
          button: "Continue",
        });
      } catch (error) {
        swal({
          title: "Oops!",
          text: `Error enviando los datos al servidor: ${error.message}`,
          icon: "error",
          button: "Continue",
        });
      }
    };

    return (
      <div>
        <Box bg="teal" p={4} color="white">
          <Flex>
            <Text fontSize="xl">Hello 👋, {user?.email || 'Guest'}</Text>
            <Spacer />
            {user && (
              <>
                <Button colorScheme="whiteAlpha" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )}
          </Flex>
        </Box>
        <div>
          <AddForm />
        </div>
        <Box bg="teal" p={4} color="white" mt="12" textAlign="center">
          <Text>
          Total Price: <strong>{user?.email === 'ramydcampusano@hotmail.com' ? totalPrecio : counterRoute}</strong>
          </Text>
        </Box>
      </div>
    );
  };

  export default Dashboard;