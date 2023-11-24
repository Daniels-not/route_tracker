// src/components/SignIn.js
import React, { useState } from 'react';
import {signIn} from '../../func/auth';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    // e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect or handle successful sign-in
      navigate('/signin');
    } catch (error) {
        swal({
            title: "Oops!",
            text: `Error validando seccion: ${error.message}`,
            icon: "error",
            button: "Continue",
          });
    }
  };

  return (
    <div>
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Iniciar Seccion
            </Heading>
            <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={6}>
            <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}
                type='submit'
                onClick={handleSignIn}
                >
                Sign In
            </Button>
            </Stack>
        </Stack>
        </Flex>
    </div>
  );
};

export default SignIn;
