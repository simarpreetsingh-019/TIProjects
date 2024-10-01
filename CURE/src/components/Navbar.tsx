import React, { useEffect, useState } from "react";
import { connectWallet, getAccount, disconnectWallet } from "../utils/wallet";
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Box, Flex, Icon, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../utils/useSessionStorage";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [login, setLogin] = useSessionStorage("login", "");
  const [token, setToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage("user", JSON.stringify({}));
  const navigate = useNavigate();



  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const disconnect = async () => {
    await disconnectWallet();
    setAccount("");
  };

  interface NavbarItemProps {
    icon: React.FC,
    label: string,
    link: string
  }

  const NavbarItem = ({ icon, label, link }: NavbarItemProps) => {
    return (
      <Link to={link}>
        <Flex align="center" p={2} cursor="pointer" borderRadius="md" _hover={{ bg: 'gray.700', color: 'cyan.300' }} border="1px" borderColor="gray.600" mb={2}>
          <Icon as={icon} mr={2} color="cyan.300" />
          <Text color="white">{label}</Text>
        </Flex>
      </Link>
    );
  };

  return (
    <Box 
      bgGradient="linear(to-r, #141E30, #243B55)" // Gradient background for the navbar
      boxShadow="0 10px 20px rgba(0, 0, 0, 0.7)" // Add a dark shadow for a 3D effect
      borderBottom="1px solid rgba(255, 255, 255, 0.1)" // Subtle bottom border for extra depth
      p={3} // Padding to create space
      position="fixed" 
      top="0" 
      width="100%" 
      zIndex="999"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        {/* Logo Section */}
       <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
       <span style={{ color: 'white' }}>CURE </span>
</Link>



        {/* Wallet and Login Buttons */}
        <VStack align="flex-end" spacing={2}>

          {/* Dynamic Menu based on Login */}

          {/* Wallet Connect/Disconnect */}
          <Flex>
            <Button
              onClick={onConnectWallet}
              bgGradient="linear(to-r, teal.300, cyan.400)" // Gradient for the connect button
              _hover={{ bgGradient: "linear(to-r, teal.400, cyan.500)" }} // Hover effect
              color="white"
              borderRadius="md"
              boxShadow="0px 4px 10px rgba(0, 255, 255, 0.6)" // Button shadow for emphasis
              m={2}
            >
              {account ? account : 'Connect Wallet'}
            </Button>
            <Button
              onClick={disconnect}
              bgGradient="linear(to-r, red.300, red.500)" // Gradient for the disconnect button
              _hover={{ bgGradient: "linear(to-r, red.400, red.600)" }} // Hover effect
              color="white"
              borderRadius="md"
              boxShadow="0px 4px 10px rgba(255, 0, 0, 0.6)" // Button shadow for emphasis
              m={2}
            >
              Disconnect
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
