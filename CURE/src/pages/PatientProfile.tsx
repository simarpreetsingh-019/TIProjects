import { Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useSessionStorage } from '../utils/useSessionStorage';

const PatientProfile = () => {
    const [user] = useSessionStorage('user', JSON.stringify({}));
    const { name, age, sex, aadhar } = JSON.parse(user);

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
                    <Card
                        bg={useColorModeValue('gray.700', 'gray.800')}
                        borderRadius='md'
                        boxShadow='lg'
                    >
                        <CardHeader>
                            <Heading size='md' color={useColorModeValue('white', 'gray.100')}>
                                Patient Profile
                            </Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider borderColor={useColorModeValue('gray.600', 'gray.500')} />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase' color={useColorModeValue('gray.300', 'gray.400')}>
                                        Name
                                    </Heading>
                                    <Text pt='2' fontSize='sm' color={useColorModeValue('white', 'gray.100')}>
                                        Hi {name}!
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase' color={useColorModeValue('gray.300', 'gray.400')}>
                                        Age
                                    </Heading>
                                    <Text pt='2' fontSize='sm' color={useColorModeValue('white', 'gray.100')}>
                                        Your, i.e {name}'s age is {age}.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase' color={useColorModeValue('gray.300', 'gray.400')}>
                                        Gender
                                    </Heading>
                                    <Text pt='2' fontSize='sm' color={useColorModeValue('white', 'gray.100')}>
                                        {sex}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase' color={useColorModeValue('gray.300', 'gray.400')}>
                                        Aadhar Card Number
                                    </Heading>
                                    <Text pt='2' fontSize='sm' color={useColorModeValue('white', 'gray.100')}>
                                        {aadhar}
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default PatientProfile;
