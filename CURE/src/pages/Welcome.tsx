import React from 'react';
import CustomCard from '../components/CustomCard';
import { Flex, Stack, useColorModeValue, Box, Text, Heading } from '@chakra-ui/react';

const Welcome = () => {
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.900', 'blackAlpha.300')}  // Darker background for contrast
                px={4}
                py={8}
                position="relative"
                overflow="hidden"
                direction="column"
                textAlign="center"
            >
                {/* Background Effects */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    opacity={0.2}
                    zIndex={-2}
                    filter="blur(10px)"
                />
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bgImage="url('/src/assets/blockchain-bg.png')"  // Optional background image
                    bgSize="cover"
                    bgPosition="center"
                    opacity={0.3}
                    zIndex={-1}
                />

                <Stack
                    spacing={4}
                    mb={8}
                    zIndex={1}
                    position="relative"
                >
                    <Heading
                        as="h1"
                        fontSize={{ base: '4xl', md: '4xl' }}
                        bg={useColorModeValue('gray.900', 'blackAlpha.300')}  
                        >
                        <Text as="span" fontSize="4xl" color="teal.300" fontWeight="bold">
                            C
                        </Text>
                        <Text as="span" fontSize="4xl" color="white">
                            entralized 
                        </Text>
                        <Text as="span" fontSize="4xl" color="teal.300" fontWeight="bold">
                            U
                        </Text>
                        <Text as="span" fontSize="4xl" color="white">
                            ser 
                        </Text>
                        <Text as="span" fontSize="4xl" color="teal.300" fontWeight="bold">
                            R
                        </Text>
                        <Text as="span" fontSize="4xl" color="white">
                            egistry for 
                        </Text>
                        <Text as="span" fontSize="4xl" color="teal.300" fontWeight="bold">
                            E
                        </Text>
                        <Text as="span" fontSize="4xl" color="white">
                            xperts
                        </Text>
                    </Heading>
                    
                    <Text fontSize={{ base: 'lg', md: 'xl' }} color={useColorModeValue('gray.200', 'gray.400')}>
  <Text
    as="span"
    fontSize={{ base: '2xl', md: '3xl' }}
    color={useColorModeValue('teal.300', 'teal.500')}
    fontWeight="bold"
    style={{
      textShadow: `0 0 5px ${useColorModeValue('teal.300', 'teal.500')}, 0 0 10px ${useColorModeValue('teal.300', 'teal.500')}`
    }}
  >
    Tezos
  </Text>
  {' '}
  Powers Your Path to Better Health.
</Text>
                </Stack>

                <Stack
                    spacing={8}
                    mx={'auto'}
                    my={'4rem'}
                    maxW={{ base: '100vw', md: '80vw', lg: '100vw' }}
                    direction={{ base: 'column', md: 'row' }}
                    flexWrap={'wrap'}
                    justify={'center'}
                    position="relative"
                    zIndex={1}
                >
                    {/* Patient Card */}
                    <Box
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                        rounded={'lg'}
                        bg={useColorModeValue('blackAlpha.300', 'gray.800')}
                        p={6}
                        h={350}
                        w={{ base: '90%', sm: '80%', md: '45%', lg: '30%' }}
                        mb={4}
                        border="1px"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        position="relative"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            height="100%"
                            opacity={0.2}
                            zIndex={-1}
                        />
                        <CustomCard
                            title="Patient"
                            desc="If you are a patient, please continue here"
                            text1="Signup"
                            text2="Login"
                            link1="/register"
                            link2="/login"
                            img="https://raw.githubusercontent.com/Tharaniesh3/CURE---Centralized-User-Registry-for-Experts/main/src/assets/patient.png"
                        />
                    </Box>

                    {/* Doctor Card */}
                    <Box
                        _hover={{ transform: 'scale(1.05)'}}
                        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                        rounded={'lg'}
                        bg={useColorModeValue('blackAlpha.300', 'gray.800')}
                        p={6}
                        w={{ base: '90%', sm: '80%', md: '45%', lg: '30%' }}
                        mb={4}
                        border="1px"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        position="relative"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            height="100%"
                            opacity={0.2}
                            zIndex={-1}
                        />
                        <CustomCard
                            title="Doctor"
                            desc="If you are a doctor, please continue here"
                            text1="Signup"
                            text2="Login"
                            link1="/doctor_register"
                            link2="/doctor_login"
                            img="https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg?w=2000"
                        />
                    </Box>

                    {/* Hospital Card */}
                    <Box
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                        rounded={'lg'}
                        bg={useColorModeValue('blackAlpha.300', 'gray.800')}
                        p={6}
                        w={{ base: '90%', sm: '80%', md: '45%', lg: '30%' }}
                        mb={4}
                        border="1px"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        position="relative"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            height="100%"
                            opacity={0.2}
                            zIndex={-1}
                        />
                        <CustomCard
                            title="Hospital"
                            desc="If you want to view hospitals and doctors, click here"
                            text1="Enter Hospitals"
                            link1="/hospital"
                            img="https://raw.githubusercontent.com/Tharaniesh3/CURE---Centralized-User-Registry-for-Experts/main/src/assets/hospital.png"
                        />
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}

export default Welcome;
