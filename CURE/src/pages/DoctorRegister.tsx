import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    createStandaloneToast,
    SlideFade,
    useDisclosure
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { addDoctor } from '../utils/operation';

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [registered, setRegistered] = useState(false);
    const [msg, setMsg] = useState('');
    const [form, setForm] = useState({
        name: '',
        aadhar: '',
        age: '',
        sex: '',
        hospital: '',
        speciality: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();

    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const handleSubmit = async () => {
        if (!allFieldsFilled()) {
            toast({
                title: "All fields are required",
                status: "error",
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/api/newUser");
            const res = response.data;
            const reg = await addDoctor(form.speciality, form.aadhar, form.sex, res.public, form.name, form.hospital, form.age);

            console.log("Doctor registered successfully");
            setMsg(res.private);

            // Mark the user as registered and allow them to view their private key
            setRegistered(true);
        } catch (error) {
            console.error("Error during signup: ", error);
            toast({
                title: "Registration failed",
                description: error.message || "An error occurred during signup",
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {registered ? (
                <Flex
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.800', 'gray.900')}>
                    <Stack spacing={8} mx={'auto'} my={'6rem'} maxW={'80vw'} py={12} px={6}>
                        <Heading lineHeight='tall'>
                            Registered Successfully! Please note down your private key as this will only be shown once.
                            <Button onClick={onToggle}>Click to view key</Button>
                            <SlideFade in={isOpen} offsetY='4px' style={{ fontSize: '1rem' }}>
                                <Box
                                    p='50px'
                                    color='white'
                                    mt='5'
                                    bg='teal.500'
                                    rounded='md'
                                    shadow='md'>
                                    {JSON.stringify(msg).slice(1, -1)}
                                </Box>
                            </SlideFade>
                        </Heading>
                        <Button onClick={() => navigate('/doctor_login')}>Login now</Button>
                    </Stack>
                </Flex>
            ) : (
                <Flex
                bg={useColorModeValue('gray.800', 'gray.900')}
                    minH={'130vh'}
                    align={'center'}
                    justify={'center'}
                    >
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading color={'white'} fontSize={'4xl'} textAlign={'center'}>
                                Sign up
                            </Heading>
                            <Text fontSize={'lg'} color={'white'}>
                                to enjoy all of our cool features ✌️
                            </Text>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('gray.700', 'gray.600')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={6}>
                                <HStack>
                                    <Box>
                                        <FormControl id="Name" isRequired>
                                            <FormLabel color={'white'}>Name</FormLabel>
                                             <Input textColor={'white'}  type="text" color={'white'} onChange={(e) => {
                                                setForm(prev => ({ ...prev, name: e.target.value }))
                                            }} />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="Age" isRequired>
                                            <FormLabel color={'white'}>Age</FormLabel>
                                             <Input textColor={'white'}  type="number" color={'white'} onChange={(e) => {
                                                setForm(prev => ({ ...prev, age: e.target.value }))
                                            }} />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="aadhar" isRequired>
                                    <FormLabel color={'white'} >Aadhar Card Number</FormLabel>
                                     <Input textColor={'white'}  type="text" onChange={(e) => {
                                        setForm(prev => ({ ...prev, aadhar: e.target.value }))
                                    }} />
                                </FormControl>
                                <FormControl id="hospital" isRequired>
                                    <FormLabel color={'white'}>Hospital/Clinic Name</FormLabel>
                                     <Input textColor={'white'}  type="text" onChange={(e) => {
                                        setForm(prev => ({ ...prev, hospital: e.target.value }))
                                    }} />
                                </FormControl>
                                <FormControl id="speciality" isRequired>
                                    <FormLabel color={'white'}>Speciality</FormLabel>
                                     <Input textColor={'white'}  type="text" onChange={(e) => {
                                        setForm(prev => ({ ...prev, speciality: e.target.value }))
                                    }} />
                                </FormControl>
                                <FormControl id="gender" isRequired>
                                    <FormLabel color={'white'}>Gender</FormLabel>
                                    <RadioGroup defaultValue='male' textColor={'white'}>
                                        <Stack spacing={5} direction='row'>
                                            <Radio colorScheme='teal' value='male' onChange={(e) => {
                                                setForm(prev => ({ ...prev, sex: 'male' }))
                                            }}>
                                                Male
                                            </Radio>
                                            <Radio colorScheme='pink' value='female' onChange={(e) => {
                                                setForm(prev => ({ ...prev, sex: 'female' }))
                                            }}>
                                                Female
                                            </Radio>
                                            <Radio colorScheme='yellow' value='other' onChange={(e) => {
                                                setForm(prev => ({ ...prev, sex: 'other' }))
                                            }}>
                                                Other
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'teal.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'teal.500',
                                        }}
                                        isLoading={loading}
                                        onClick={handleSubmit}>
                                        Sign up
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'} color={'white'}>
                                        Already registered? <Link color={'teal.400'} href="/doctor_login">Login</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            )}
            <ToastContainer />
        </>
    )
}
