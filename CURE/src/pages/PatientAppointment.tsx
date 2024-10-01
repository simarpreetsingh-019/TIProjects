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
    Select,
    createStandaloneToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { makeAppointment } from '../utils/operation';
import { useSessionStorage } from '../utils/useSessionStorage';

const { toast, ToastContainer } = createStandaloneToast();

export default function PatientAppointment() {
    const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
    const thisuser = JSON.parse(user);
    const [doctors, setDoctors] = useState([]);
    
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await axios.get("http://localhost:4000/api/DoctorList");
                setDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        }
        fetchDoctors();
    }, []);

    const [appointmentData, setAppointmentData] = useState({
        name: thisuser.name,
        aadhar: thisuser.aadhar,
        privateKey: "",
        doctorAadhar: "",
        symptoms: "",
    });

    useEffect(() => {
        console.log(appointmentData);
    }, [appointmentData]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAppointmentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setAppointmentData(prev => ({
            ...prev,
            privateKey: prev.privateKey.replace(/\\n/g, '\n')
        }));

        const url = 'http://localhost:4000/api/makeAppointment';
        const config = {
            maxBodyLength: Infinity,
            headers: { 'Content-Type': 'application/json' }
        };

        try {
            const response = await axios.post(url, appointmentData, config);
            console.log(response.data);
            await makeAppointment(response.data.hashedAadhar, response.data.symptoms, appointmentData.doctorAadhar,
                response.data.AESencryptForDoctor, response.data.rsa, response.data.encryptedDoctorName);
            navigate('/patient_home');
        } catch (error) {
            if ("response" in error && "data" in error.response) {
                console.error(error.response.data.message);
            } else {
                console.error("Error occurred:", error);
            }
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.800', 'gray.900')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} my={20}>
                    <Stack align={'center'}>
                        <Heading color="white" fontSize={'4xl'} textAlign={'center'}>
                            Make an Appointment
                        </Heading>
                        <Text fontSize={'lg'} color={'white'}>
                            with any doctor! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('blackAlpha.300', 'gray.800')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="privatekey" isRequired>
                                <FormLabel color="white">Enter your private key</FormLabel>
                                <Input color="white" type="text" name="privateKey"
                                    value={appointmentData.privateKey} onChange={handleChange} />
                            </FormControl>

                            <FormControl id="doctor" isRequired>
                                <FormLabel color="white">Doctor</FormLabel>
                                <Select color="white"
                                    placeholder='Select Doctor'
                                    onChange={(e) => {
                                        const selectValue = e.target.value;
                                        setAppointmentData(prev => ({ ...prev, doctorAadhar: selectValue }));
                                    }}
                                >
                                    {doctors.length > 0 ? doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.aadhar}>{doctor.name}</option>
                                    )) : <option>No doctors available</option>}
                                </Select>
                            </FormControl>

                            <FormControl id="symptoms" isRequired>
                                <FormLabel color="white" >Symptoms</FormLabel>
                                <Input color="white" type="text" name="symptoms"
                                    value={appointmentData.symptoms} onChange={handleChange} />
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'teal.400'}
                                    color={'white'}
                                    _hover={{ bg: 'teal.500' }}
                                    onClick={handleSubmit}>
                                    Make Appointment
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'} color='white'>
                                    Wanna add your Diagnosis? <Link color={'teal.400'} href="/patient_adddiag">Add Diagnosis</Link>
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
