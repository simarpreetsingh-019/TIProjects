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

import { useEffect, useState } from 'react'
import { showToast } from '../utils/showToasts';
import { useSessionStorage } from '../utils/useSessionStorage';
import { useNavigate } from 'react-router-dom';

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [form, setForm] = useState({
        aadhar: '',
    })

    const [loading, setLoading] = useState(false);

    // const [UserDiagnosis, setUserDiagnosis] = useState([])
    const navigate = useNavigate()
    const [login,setLogin] = useSessionStorage('login','false');
    const [token, setToken] = useSessionStorage('token', '');
    const [user,setUser] = useSessionStorage('user', JSON.stringify({}));

    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const handleSubmit = async () =>{
        console.log('handleSubmit called');
        
        const response = await axios.post("http://localhost:4000/api/doctorlogin", {
            aadhar: form.aadhar,
            });
      
            console.log(response.data)
            const {message, user, token} = response.data;

            setUser(JSON.stringify(user))
            setLogin('true')
            setToken(token)
            navigate('/doctor_view')
            window.location.reload();

            // let temp = [];
            // for (let field in data) {
            // temp.push({...data[field], "Aadhar": field});
            // }
            // setUserDiagnosis(temp);
            // console.log("logged In Successfully")
    }
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.800', 'gray.900')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'} textColor={'white'}>
                            Login
                        </Heading>
                        <Text textColor={'white'} fontSize={'lg'}>
                            to start off quickly! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('gray.700', 'gray.600')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                    
                                    <FormControl id="aadhar" isRequired>
                                        <FormLabel color={'white'}>Aadhar Card Number</FormLabel>
                                        <Input type="text" textColor={'white'} onChange={(e) => {
                                            setForm(prev => ({ ...prev, aadhar: e.target.value }))
                                        }} />
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
                                    onClick={(e) => {
                                        handleSubmit();

                                    }}>
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text  textColor={'white'} align={'center'}>
                                    Not registered? <Link color={'teal.400'} href="/doctor_register">Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <ToastContainer />
        </>
    )
}