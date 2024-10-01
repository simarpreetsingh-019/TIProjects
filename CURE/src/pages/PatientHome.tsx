import React, { useState, useEffect } from 'react';
import { useSessionStorage } from './../utils/useSessionStorage';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Flex,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import DiagnosisCard from '../components/DiagnosisCard';
import Card from "../components/Card";
import { controlVisibility } from '../utils/operation';

const PatientHome = () => {
  const [searchFilter, setSearchFilter] = useState('doctorName'); // Default filter
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
  const [access, setAccess] = useState([]);
  const [hashedAadhar, setHashedAadhar] = useState('');
  const thisuser = JSON.parse(user);

  const [key, setKey] = useState({
    aadhar: thisuser.aadhar,
    privateKey: ''
  });

  useEffect(() => {
    console.log(key);
  }, [key]);

  const handleSubmit = async () => {
    try {
      const config = {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      setKey(prev => ({
        ...prev,
        privateKey: key.privateKey.replace(/\\n/g, '\n')
      }));
      const response = await axios.post("http://localhost:4000/api/get_diagnosis", key, config);
      const { message, data, doctorAccess, hashedAadhar } = response.data;
      console.log("doctorAccess: ", doctorAccess);
      setAccess(doctorAccess);
      setHashedAadhar(hashedAadhar);
      setData(data);
      const newDiagnosisElements = data.map((item: any) => (
        <DiagnosisCard
          key={item._id}
          symptoms={item.data.symptoms}
          doctorName={item.data.doctorName}
          diagnosis={item.data.diagnosis}
          document={item.data.document}
          patientName={item.data.patientName}
          docType={item.data.docType}
          upload={false}
        />
      ));
      setHistory(newDiagnosisElements);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(item: any) {
    let removeAccess = await controlVisibility(item, hashedAadhar);
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.800', 'gray.900')}
      p={4}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color="white">
            All Diagnosis
          </Heading>
          <FormControl id="key" isRequired>
            <FormLabel color="gray.300">Enter your private key</FormLabel>
            <Input
              type="text"
              onChange={(e) => setKey(prev => ({ ...prev, privateKey: e.target.value }))}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color="white"
              borderColor={useColorModeValue('gray.600', 'gray.500')}
            />
          </FormControl>
          <Button
            loadingText="Submitting"
            size="lg"
            bg={useColorModeValue('teal.500', 'teal.300')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('teal.600', 'teal.400'),
            }}
            _active={{
              bg: useColorModeValue('teal.700', 'teal.500'),
            }}
            onClick={handleSubmit}
          >
            Show Diagnosis
          </Button>

          {history.length > 0 && (
            <>
              <FormControl id="search">
                <FormLabel color="gray.300">Search by:</FormLabel>
                <Select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  bg={useColorModeValue('gray.700', 'gray.600')}
                  color="white"
                  borderColor={useColorModeValue('gray.600', 'gray.500')}
                  _placeholder={{ color: 'gray.400' }}
                >
                  <option value="doctorName">Doctor Name</option>
                  <option value="docType">Document Type</option>
                  <option value="diagnosis">Diagnosis</option>
                  <option value="symptoms">Symptoms</option>
                </Select>
                <FormLabel color="gray.300">Search Query:</FormLabel>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={useColorModeValue('gray.700', 'gray.600')}
                  color="white"
                  borderColor={useColorModeValue('gray.600', 'gray.500')}
                />
                <Button
                  size="md"
                  bg={useColorModeValue('teal.500', 'teal.300')}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('teal.600', 'teal.400'),
                  }}
                  _active={{
                    bg: useColorModeValue('teal.700', 'teal.500'),
                  }}
                  onClick={() => {
                    const newDiagnosisElements = data
                      .filter(item => {
                        const searchQueryLower = searchQuery.toLowerCase();
                        switch (searchFilter) {
                          case 'doctorName':
                            return item.data.doctorName.toLowerCase().includes(searchQueryLower);
                          case 'docType':
                            return item.data.docType.toLowerCase().includes(searchQueryLower);
                          case 'diagnosis':
                            return item.data.diagnosis.toLowerCase().includes(searchQueryLower);
                          case 'symptoms':
                            return item.data.symptoms.toLowerCase().includes(searchQueryLower);
                          default:
                            return true; // Default to including all items
                        }
                      })
                      .map(item => (
                        <DiagnosisCard
                          key={item._id}
                          symptoms={item.data.symptoms}
                          doctorName={item.data.doctorName}
                          diagnosis={item.data.diagnosis}
                          document={item.data.document}
                          patientName={item.data.patientName}
                          docType={item.data.docType}
                          upload={false}
                        />
                      ));
                    setHistory(newDiagnosisElements);
                  }}
                >
                  Search Diagnosis
                </Button>
              </FormControl>
            </>
          )}
          {history}
          {access.length > 0 && (
            <Heading fontSize={'2xl'} textAlign={'center'} color="white">
              All Doctors with Access to your Diagnosis
            </Heading>
          )}
          <Stack spacing={4} style={{ flex: 1, flexDirection: "row" }}>
            {access.map(item => (
              <Card
                key={item.aadhar}
                title={item.name}
                sex={item.sex}
                age={item.age}
                speciality={item.speciality}
                // controlVisibility={() => remove(item.aadhar)}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default PatientHome;
