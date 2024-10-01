import React from "react";
import { Button, FormControl, FormLabel, Input, Stack, useColorModeValue, Box, Heading, Flex } from "@chakra-ui/react";
import axios from "axios";
import { addRecord } from "../utils/operation";

export default function NewDiagnosisForm(props) {
    let form = props.form;
    const [newDiagnosis, setNewDiagnosis] = React.useState({
        diagnosis: "", 
        docType: "",
        doctorName: "",
        document: "",
        symptoms: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewDiagnosis(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const submitBut = async (event) => {
        event.preventDefault();
        let data = {
            "aadhar": form.aadhar,
            "privateKey": form.secretKey,
            "name": form.name,
            "diagnosis": newDiagnosis.diagnosis,
            "docType": newDiagnosis.docType,
            "docName": newDiagnosis.doctorName,
            "document": newDiagnosis.document,
            "symptoms": newDiagnosis.symptoms
        };

        console.log(data);
        
        const url = 'http://localhost:4000/api/makeDiagnosis';
        let config = {
            maxBodyLength: Infinity,
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        console.log("Making the call");
        axios.post(url, data, config)
        .then(async (response) => {
            console.log(response.data);
            console.log(JSON.stringify(response.data));
            await addRecord(response.data.symptoms, response.data.diagnosis, response.data.name, response.data.document,
                response.data.DocName, response.data.DocType, response.data.userAadhar, response.data.RSAencryptedcipherKey)
                .then(
                    (response) => {
                        // alert("Diagnosis added");
                    }
                )
                .catch((error) => {
                    // alert("Error Occurred", error);
                });
        })
        .catch((error) => {
            if ("response" in error) {
                if ("data" in error.response) {
                    // alert(error.response.data.message);
                }
                console.log(error.response.data.message);
            } else {
                console.log("Error Occurred");
            }
        });
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.800', 'gray.900')}
            p={4}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} my={20}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'} color={useColorModeValue('white', 'gray.100')}>
                        New Diagnosis Form
                    </Heading>
                    <Box
                        bg={useColorModeValue('gray.700', 'gray.800')}
                        p={6}
                        borderRadius="md"
                        boxShadow="lg"
                        width="full"
                    >
                        <Stack spacing={4}>
                            <FormControl id="diagnosis" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>
                                    Diagnosis
                                </FormLabel>
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
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>
                                    Document Type
                                </FormLabel>
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
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>
                                    Doctor Name
                                </FormLabel>
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
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>
                                    Document
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="document"
                                    value={newDiagnosis.document}
                                    onChange={handleChange}
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color="white"
                                    borderColor={useColorModeValue('gray.500', 'gray.600')}
                                />
                            </FormControl>
                            <FormControl id="symptoms" isRequired>
                                <FormLabel color={useColorModeValue('gray.300', 'gray.400')}>
                                    Symptoms
                                </FormLabel>
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
                            <Button
                                size="lg"
                                bg={'blue.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.600',
                                }}
                                _active={{
                                    bg: 'blue.700',
                                }}
                                onClick={submitBut}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Flex>
    );
}
