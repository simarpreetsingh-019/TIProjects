import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useDisclosure,
    createStandaloneToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addRecord } from '../utils/operation';
import { useSessionStorage } from '../utils/useSessionStorage';

const { toast, ToastContainer } = createStandaloneToast();

export default function PatientAddDiag() {
    const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
    const thisuser = JSON.parse(user);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [newDiagnosis, setNewDiagnosis] = useState({
        name: thisuser.name,
        aadhar: thisuser.aadhar,
        privateKey: "",
        diagnosis: "",
        docType: "",
        doctorName: "",
        document: "",
        symptoms: "",
    });

    useEffect(() => {
        console.log(newDiagnosis);
    }, [newDiagnosis]);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const allFieldsFilled = () => {
        const values = Object.values(newDiagnosis);
        return values.every(value => value.trim().length > 0);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewDiagnosis(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:4000/api/makeDiagnosis';
        let config = {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log("Making the call");

        setNewDiagnosis(prev => ({
            ...prev,
            privateKey: prev.privateKey.replace(/\\n/g, '\n')
        }));

        let requestParam = {
            "aadhar": newDiagnosis.aadhar,
            "privateKey": newDiagnosis.privateKey,
            "name": newDiagnosis.name,
            "diagnosis": newDiagnosis.diagnosis,
            "docType": newDiagnosis.docType,
            "docName": newDiagnosis.doctorName,
            "document": newDiagnosis.document,
            "symptoms": newDiagnosis.symptoms
        };

        axios.post(url, requestParam, config)
            .then(async (response) => {
                console.log(response.data);
                console.log(JSON.stringify(response.data));
                await addRecord(response.data.symptoms, response.data.diagnosis, response.data.name, response.data.document,
                    response.data.DocName, response.data.DocType, response.data.userAadhar, response.data.RSAencryptedcipherKey)
                    .then(
                        (response) => {
                            console.log(response);
                            navigate('/patient_home');
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDocumentHash = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('document', selectedFile);

            try {
                const response = await axios.post('http://localhost:4000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("document:response.data.document = ", response.data.document);
                setNewDiagnosis(prev => ({ ...prev, document: response.data.document }));
                console.log("newDiagnosis = ", newDiagnosis);
                console.log('File uploaded:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.800', 'gray.900')}
                p={4}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={useColorModeValue('white', 'gray.100')}>
                            Add Diagnosis
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.400'}>
                            Keep your records updated! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('gray.700', 'gray.800')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="privatekey" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Enter your private key</FormLabel>
                                <Input
                                    type="text"
                                    name="privateKey"
                                    value={newDiagnosis.privateKey}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
                            </FormControl>

                            <FormControl id="diagnosis" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Diagnosis Subject</FormLabel>
                                <Input
                                    type="text"
                                    name="diagnosis"
                                    value={newDiagnosis.diagnosis}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
                            </FormControl>

                            <FormControl id="docType" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Document Type</FormLabel>
                                <Input
                                    type="text"
                                    name="docType"
                                    value={newDiagnosis.docType}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
                            </FormControl>

                            <FormControl id="doctorName" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Doctor Name</FormLabel>
                                <Input
                                    type="text"
                                    name="doctorName"
                                    value={newDiagnosis.doctorName}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
                            </FormControl>

                            <FormControl id="document" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Medical Document</FormLabel>
                                <Input
                                    type="file"
                                    name="document"
                                    onChange={handleFileChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                />
                                <Button
                                    loadingText="Submitting"
                                    size="md"
                                    bg={'orange.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'orange.500',
                                    }}
                                    mt={2}
                                    onClick={handleDocumentHash}
                                >
                                    Upload Document
                                </Button>
                            </FormControl>

                            <FormControl id="symptoms" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>Symptoms</FormLabel>
                                <Input
                                    type="text"
                                    name="symptoms"
                                    value={newDiagnosis.symptoms}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
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
                                        handleSubmit(e);
                                    }}
                                >
                                    Add Diagnosis
                                </Button>
                            </Stack>

                            <Stack pt={6}>
                                <Text align={'center'} color= 'white'>
                                    Make an appointment? <Link color={'teal.400'} href="/patient_appointment">Add Appointment</Link>
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
