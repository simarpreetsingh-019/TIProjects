import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    createStandaloneToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSessionStorage } from './../utils/useSessionStorage'
import { useNavigate } from 'react-router-dom'

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [form, setForm] = useState({
        aadhar: '',
        privateKey: ''
    });

    const [login, setSessionLogin] = useSessionStorage('login', 'false');
    const [token, setSessionToken] = useSessionStorage('token', '');
    const [user, setSessionUser] = useSessionStorage('user', JSON.stringify({}));

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const handleSubmit = async () => {
        setForm(prev => ({
            ...prev,
            privateKey: form.privateKey.replace(/\\n/g, '\n')
        }));

        const url = 'http://localhost:4000/api/login';
        let config = {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post(url, form, config)
            .then((response) => {
                console.log(response.data);
                const { message, name, age, sex, aadhar, token } = response.data;
                setSessionLogin("true");
                setSessionToken(token);
                setSessionUser(JSON.stringify({ name, age, sex, aadhar }));
                navigate('/patient_home');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.900', 'gray.800')}
                p={4}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={useColorModeValue('teal.400', 'teal.300')}>
                            Login
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.400'}>
                            Access your account quickly and securely.
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('gray.800', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="aadhar" isRequired>
                                <FormLabel color={useColorModeValue('gray.200', 'gray.300')}>Aadhar Card Number</FormLabel>
                                <Input 
                                    type="text" 
                                    onChange={(e) => {
                                        setForm(prev => ({ ...prev, aadhar: e.target.value }));
                                    }}
                                    bg={useColorModeValue('gray.700', 'gray.600')}
                                    color={'white'}
                                    borderColor={useColorModeValue('gray.600', 'gray.500')}
                                    _placeholder={{ color: 'gray.400' }}
                                    placeholder="Enter your Aadhar number"
                                />
                            </FormControl>

                            <FormControl id="privatekey" isRequired>
                                <FormLabel color={useColorModeValue('gray.200', 'gray.300')}>Paste your Private Key</FormLabel>
                                <Input 
                                    type="text" 
                                    onChange={(e) => {
                                        setForm(prev => ({ ...prev, privateKey: e.target.value }));
                                    }}
                                    bg={useColorModeValue('gray.700', 'gray.600')}
                                    color={'white'}
                                    borderColor={useColorModeValue('gray.600', 'gray.500')}
                                    _placeholder={{ color: 'gray.400' }}
                                    placeholder="Enter your private key"
                                />
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'teal.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'teal.600',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                            </Stack>

                            <Stack pt={6}>
                                <Text align={'center'} color={'white'}>
                                    Not registered? <Link color={'teal.400'} href="/register">Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <ToastContainer />
        </>
    );
}
