import React from 'react'
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text, Image, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface ICustomCardProps {
    title: string,
    desc: string,
    text1: string,
    text2?: string,
    link1: string,
    link2?: string,
    img: string
}

const CustomCard = ({ title, desc, text1, text2, link1, link2, img }: ICustomCardProps) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bg={useColorModeValue('gray.800', 'gray.900')} // Dark background for card
            rounded='lg'
            transition='transform 0.3s ease, box-shadow 0.3s ease'
            _hover={{ transform: 'scale(1.05)', boxShadow: '0 15px 35px rgba(0, 255, 255, 0.8)' }} // Enhanced hover effect
            style={{ cursor: 'pointer' }}
        >
            {/* Image Section */}
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '150px' }} // Ensure the image fills the card on small screens
                src={img}
                alt='Card Image'
                borderRadius='lg'
                filter='brightness(0.8)' // Dim the image for a sleek look
            />

            {/* Content Section */}
            <Stack spacing={4} p={4}>
                <CardBody>
                    <Heading size='lg' color={useColorModeValue('blue.300', 'blue.400')}>
                        {title}
                    </Heading>
                    <Text py='2' color={useColorModeValue('gray.200', 'gray.300')}>
                        {desc}
                    </Text>
                </CardBody>

                <CardFooter display={{ base: 'block', sm: 'flex' }} justifyContent='start' flexWrap='wrap'>
                    <Link to={link1}>
                        <Button 
                            variant='solid' 
                            bgGradient='linear(to-r, teal.400, blue.500)' 
                            color='white'
                            m={1} 
                            width={{ base: '100%', sm: 'auto' }} 
                            _hover={{ bgGradient: 'linear(to-r, teal.500, blue.600)', boxShadow: 'lg' }}
                            _active={{ bgGradient: 'linear(to-r, teal.600, blue.700)', boxShadow: 'md' }}
                            _focus={{ boxShadow: 'outline' }}
                        >
                            {text1}
                        </Button>
                    </Link>
                    {text2 && (
                        <Link to={link2}>
                            <Button 
                                variant='solid' 
                                bgGradient='linear(to-r, orange.400, yellow.500)' 
                                color='white'
                                m={1} 
                                width={{ base: '100%', sm: 'auto' }} 
                                _hover={{ bgGradient: 'linear(to-r, orange.500, yellow.600)', boxShadow: 'lg' }}
                                _active={{ bgGradient: 'linear(to-r, orange.600, yellow.700)', boxShadow: 'md' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                {text2}
                            </Button>
                        </Link>
                    )}
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default CustomCard
