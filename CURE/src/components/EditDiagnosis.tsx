import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSessionStorage } from '../utils/useSessionStorage';
import { updateDiagnosis } from '../utils/operation';

const EditDiagnosis = ({user, diag}) => {

    const [doctor, setDoctor] = useSessionStorage("user", JSON.stringify({}));
    const Doctor = JSON.parse(doctor);
    const [form,setForm]=useState({
        docType:'',
        document:'',
        diagnosis:'',
        privateKey:''
    })

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();
        let fileDocument = '';
        if (selectedFile) {
            const formData = new FormData();
            formData.append('document', selectedFile);

            try {
                const response = await axios.post('https://efficacious-writing-production.up.railway.app/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }). 
                then(async (response) => {


                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    
                    const res2 = await axios.post(
                        "https://efficacious-writing-production.up.railway.app/api/updateDiagnosis",
                        {
                            encryptionKey: user.aesEncryption,
                            privateKey: form.privateKey.replace(/\\n/g, "\n"),
                            document: response.data.document,
                            diagnosis: form.diagnosis,
                            docType: form.docType
                        }, config
                      );
    
                    console.log('File uploaded:', res2.data);

                    const upload = await updateDiagnosis(res2.data.document, user.Aadhar, Doctor.aadhar, 
                        res2.data.docType, diag.loc, res2.data.diagnosis)
                }). 
                catch (error => {
                    console.error(error);
                });
                }
                catch (error) {
                    console.log(error);
                };
                

                // setNewDiagnosis(prev=>({...prev, document:response.data.document}));
                // console.log("newDiagnosis = ", newDiagnosis);

               
        } 
        else{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            const res2 = await axios.post(
                "https://efficacious-writing-production.up.railway.app/api/updateDiagnosis",
                {
                    encryptionKey: user.aesEncryption,
                    privateKey: form.privateKey.replace(/\\n/g, "\n"),
                    document: fileDocument,
                    diagnosis: form.diagnosis,
                    docType: form.docType
                }, config
              );

              const upload = await updateDiagnosis(res2.data.document, user.Aadhar, Doctor.aadhar, 
                res2.data.docType, diag.loc, res2.data.diagnosis)


        }



        

    };
  return (
    <div>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Upload document
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    for diagnosis ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <HStack>
                        <Box>
                            <FormControl id="doctype" isRequired>
                                <FormLabel>Document Type</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, docType: e.target.value }))
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="Age" isRequired>
                                <FormLabel>Document</FormLabel>
                                <Input type="file" onChange={handleFileChange} />
                            </FormControl>

                        </Box>
                    </HStack>
                    <FormControl id="diagnosis" isRequired>
                                <FormLabel>Diagnosis</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, diagnosis: e.target.value }))
                                }} />
                            </FormControl>
                            <FormControl id="privatekey" isRequired>
                                <FormLabel>Enter your private key</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, privateKey: e.target.value }))
                                }} />
                            </FormControl>
                   
                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={update}>
                            Upload and edit
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack> 
    </div>
  )
}

export default EditDiagnosis
