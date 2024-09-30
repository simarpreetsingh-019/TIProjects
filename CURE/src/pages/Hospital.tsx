import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Spinner, Box, Text, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';

const HospitalInfo = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch hospital and doctor data from the API
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getHospital");
        setHospitalData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        setError("Failed to load hospital data.");
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh" bg={useColorModeValue('gray.800', 'gray.900')} mt="150px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minHeight="100vh" bg={useColorModeValue('gray.800', 'gray.900')} mt="150px">
        <Text fontSize="lg" color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" minHeight="100vh" p={6} bg={useColorModeValue('gray.800', 'gray.900')}>
      {hospitalData.length > 0 ? (
        <Box w="full"  mt="150px">
          {hospitalData.map(hospital => (
            <Box key={hospital.hospitalName} mb={8}>
              <Heading as="h2" size="lg" mb={4} textAlign="center" color={useColorModeValue('gray.800', 'gray.100')}>
                {hospital.hospitalName}
              </Heading>
              <Flex wrap="wrap" justify="center">
                {hospital.doctors.length > 0 ? (
                  hospital.doctors.map(doctor => (
                    <Card
                      key={doctor.aadhar}
                      title={doctor.name}
                      sex={doctor.sex}
                      age={doctor.age}
                      speciality={doctor.speciality}
                      ishospital={true}
                    />
                  ))
                ) : (
                  <Text>No doctors available in this hospital.</Text>
                )}
              </Flex>
            </Box>
          ))}
        </Box>
      ) : (
        <Text fontSize="lg">No hospitals available at the moment.</Text>
      )}
    </Flex>
  );
};

export default HospitalInfo;
