import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
  createStandaloneToast,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addPatient } from "../utils/operation";

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
  const [registered, setRegistered] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    aadhar: "",
    age: "",
    sex: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const allFieldsFilled = () => {
    const values = Object.values(form);
    return values.every((value) => value.trim().length > 0);
  };

  const handleSubmit = async () => {
    if (!allFieldsFilled()) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let data = JSON.stringify(form);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config as any)
      .then(async (response) => {
        const res = response.data;
        try {
          await addPatient(
            res.sex,
            res.aadhar,
            res.publicKey,
            res.name,
            res.age
          );
          setForm((prev) => ({
            ...prev,
            privateKey: res.privateKey,
          }));
          setRegistered(true);
          setMsg(res.privateKey);
        } catch (err) {
          console.error(err);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Registration Error",
          description: "There was a problem with your registration.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      {registered ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue('gray.800', 'gray.900')}
          p={4}
        >
          <Stack
            spacing={8}
            mx={"auto"}
            my={"3rem"}
            maxW={"80vw"}
            py={12}
            px={6}
            align={"center"}
          >
            <Heading
              lineHeight="tall"
              textAlign={"center"}
              color={useColorModeValue("teal.300", "teal.400")}
            >
              Registered Successfully!
              <Text mt={4}>
                Please note down your private key as this will be shown only
                once. Click the button to view the key.
              </Text>
              <Button mt={4} colorScheme="teal" onClick={onToggle}>
                {isOpen ? "Hide Key" : "Show Key"}
              </Button>
              <SlideFade in={isOpen} offsetY="20px">
                <Box
                  mt={4}
                  p={6}
                  bg={useColorModeValue('gray.800', 'gray.900')}
                  color="white"
                  rounded="md"
                  shadow="md"
                >
                  {msg}
                </Box>
              </SlideFade>
            </Heading>
            <Button mt={6} colorScheme="teal" onClick={() => navigate("/login")}>
              Login now
            </Button>
          </Stack>
        </Flex>
      ) : (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.800", "gray.900")}
          p={4}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"} color="white">
                Sign Up
              </Heading>
              <Text fontSize={"lg"} color={"gray.400"}>
                Join us and enjoy all of our features!
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("gray.700", "gray.800")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack spacing={4}>
                  <Box flex="1">
                    <FormControl id="Name" isRequired>
                      <FormLabel color="gray.300">Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        color="white"
                        bg={useColorModeValue("gray.800", "gray.700")}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box flex="1">
                    <FormControl id="Age" isRequired>
                      <FormLabel color="gray.300">Age</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        color="white"
                        bg={useColorModeValue("gray.800", "gray.700")}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, age: e.target.value }))
                        }
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="aadhar" isRequired>
                  <FormLabel color="gray.300">Aadhar Card Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Aadhar number"
                    color="white"
                    bg={useColorModeValue("gray.800", "gray.700")}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, aadhar: e.target.value }))
                    }
                  />
                </FormControl>
                <FormControl id="gender" isRequired>
                  <FormLabel color="gray.300">Gender</FormLabel>
                  <RadioGroup value={form.sex} onChange={(value) => setForm((prev) => ({ ...prev, sex: value }))}>
                    <Stack spacing={4} direction="row" color={"white"}>
                      <Radio color="white" value="male">Male</Radio>
                      <Radio color="white" value="female">Female</Radio>
                      <Radio color="white" value="other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"teal.500"}
                    color={"white"}
                    _hover={{
                      bg: "teal.600",
                    }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"} color="gray.400">
                    Already a user?{" "}
                    <Link color={"teal.300"} href="/login">
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
      <ToastContainer />
    </>
  )
}
