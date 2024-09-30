import React from 'react';
import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { useSessionStorage } from '../utils/useSessionStorage';
import { useNavigate } from 'react-router-dom';

const DoctorSidebar = () => {
  const menuItems = [
    { icon: FaHome, label: 'Home',link:'/doctor_home' },
    { icon: FaUser, label: 'Profile', link:'/doctor_profile'},
    { icon: FaUser, label: 'All Patients',link:'/doctor_home' },
    { icon: FaUser, label: 'Search Patient',link:'/doctor_adddiag' },
    {icon:FaUser, label:'Search Doctor', link:'/doctor_search'},
    { icon: FaUser, label: 'Accept Appointment',link:'/doctor_appointment' },
    { icon: FaUser, label: 'Logout',link:'/doctor_login' },
  ];

  const [login, setLogin] = useSessionStorage("login", "");
  const [token, setToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage(
    "user",
    JSON.stringify({})
  );

  const navigate = useNavigate();

  return (
    <Box
      as="nav"
      pos="fixed"
      top={0}
      left={0}
      w="240px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      boxShadow="lg"
    >
      <Flex align="center" justify="center" h="20">
        <Text fontSize="xl" fontWeight="bold">
          My Dashboard
        </Text>
      </Flex>
      <VStack spacing={1} align="stretch">
        {menuItems.map((item, index) => (
          <Link to={item.link} style={{textDecoration:'none', color:'white'}}>
          <Flex
            key={index}
            align="center"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.600' }}
            style={{cursor:'pointer'}}
          >
            <Icon as={item.icon} mr={4} />
            <Text style={{fontSize:'1.2rem'}}>{item.label}</Text>
          </Flex>
          </Link>
        ))}
          <Flex
            align="center"
            p={6}
            borderRadius="md"
            _hover={{ bg: 'gray.600' }}
            style={{cursor:'pointer'}}
            onClick={e=>{
              setLogin("false");
              setToken("");
              setUser(JSON.stringify({}));
              navigate('/login')
              window.location.reload();

            }}
          >
            <Icon as={FaSignOutAlt} mr={4} />
            <Text style={{fontSize:'1.2rem'}}>Logout</Text>
          </Flex>
      </VStack>
    </Box>
  );
};

export default DoctorSidebar;