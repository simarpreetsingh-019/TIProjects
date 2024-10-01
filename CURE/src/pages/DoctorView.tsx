import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import {BsGenderFemale, BsGenderMale, BsGenderAmbiguous} from 'react-icons/bs'


import axios from "axios";
import { useSessionStorage } from "../utils/useSessionStorage";
import Card from "../components/Card";
import DiagnosisCard from "../components/DiagnosisCard";
import EditDiagnosis from "../components/EditDiagnosis";
import { controlVisibility } from "../utils/operation";

interface IItem {
  name: string;
  age: string;
  sex: string;
  aesEncryption: string;
  aesDecrypted: string;
}

export default function DoctorView() {
  const [docForm, setDocForm] = useState({
    privateKey: "",
  });

  const [user, setUser] = useSessionStorage("user", JSON.stringify({}));
  const User = JSON.parse(user);

  const { aadhar, ...rest } = User;

  const [UserDiagnosis, setUserDiagnosis] = useState([]);

  async function getDiagnosis() {
    const response = await axios.post(
      "http://localhost:4000/api/getDoctorViewList",
      {
        aadhar,
        privateKey: docForm.privateKey.replace(/\\n/g, "\n"),
      }
    );

    console.log(response.data);
    const { message, data } = response.data;

    let temp = [];
    for (let field in data) {
      let ele = { ...data[field], Aadhar: field }
      temp.push(ele);
    }
    setUserDiagnosis(temp);
  }

  function change(event) {
    const { name, value } = event.target;
    setDocForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [showOne, setShowOne] = useState(false);
  const [patientDiagnosis, setPatientDiagnosis] = useState([]);
  const [selectedUser,setSelectedUser] = useState({})

  useEffect(()=>{
console.log(patientDiagnosis);
  },[patientDiagnosis])

  async function oneDiagnosis(item) {
    console.log(item);
    const response = await axios.post(
      "http://localhost:4000/api/doctorViewDiagnosis",
      {
        aadhar: item.Aadhar,
        privateKey: docForm.privateKey.replace(/\\n/g, "\n"),
        encryptedAESKEY: item.aesEncryption,
      }
    );

    console.log(response.data);
    const { message, diagnosis_list } = response.data;

    setSelectedUser(item)
    setPatientDiagnosis(diagnosis_list);
    setShowOne(true);
  }

  function handleDiagnosisClick(loc: string) {
    console.log("Clicked on diagnosis with loc:", loc);
    // Add your logic here to perform actions when a diagnosis element is clicked
  }

  const [view, setView] = useState(false)
  const [currDiag, setCurrDiag] = useState({})

  const viewEdit = (item) => {
    setView(true)
    setCurrDiag(item)
    console.log("item ", item)
  }

  const remove = async (item:any) => {
    console.log(item)
    console.log("aadhar = ", item.Aadhar)
    console.log("DocAaddhar = ", aadhar)

    const visiblityControl = await controlVisibility(aadhar, item.Aadhar);
  }



  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      flexDirection={"column"}
      bg={useColorModeValue('gray.900', 'blackAlpha.300')} 
      >
        
      <Stack spacing={8} mx={"auto"} my={"3rem"} maxW={"40vw"} py={12} px={6} >
        <Heading lineHeight="tall" color='white'>Get All Patients</Heading>
        <Box
                  bg={useColorModeValue('gray.700', 'gray.500')}
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} >
            <FormControl id="privateKey" isRequired>
              <FormLabel  color='white'>Enter your private key</FormLabel>
              <Input color={'white'}
                type="text"
                placeholder="Secret Key"
                name="privateKey"
                value={docForm.privateKey}
                onChange={(e) => change(e)}
              />
            </FormControl>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
              onClick={getDiagnosis}
            >
              Get Patients
            </Button>
          </Stack>
        </Box>
      </Stack>
      {showOne? <Stack spacing={8} maxW={"100vw"} px={6} >
        {view && <EditDiagnosis 
        user={selectedUser}
        diag={currDiag}/>}
      <Heading fontSize={'2xl'} textAlign={'center'}>
      All Diagnosis of {(selectedUser as any).name}
      </Heading>
      <Stack spacing={4} style={{ flex: 1, flexDirection: "row" }}>
        {patientDiagnosis.map(item=>{return(<>
          <DiagnosisCard docType={item.data.docType} document={item.data.document} symptoms={item.data.symptoms}
                diagnosis={item.data.diagnosis} doctorName={item.data.doctorName} patientName={item.data.patientName} 
                viewEdit={() => viewEdit(item)} upload={true}/>
        </>)})}
        </Stack>
      </Stack>:""}
      <Stack spacing={8} maxW={"100vw"} px={6}>
      <Heading fontSize={'4xl'} textAlign={'center'}  color={'white'}>
      Your Patients
      </Heading>
        {UserDiagnosis && UserDiagnosis.length ? (
          <Stack spacing={4} style={{ flex: 1, flexDirection: "row" }}>
            
            {UserDiagnosis.map((item: IItem, index) => {
              return <Card title={item.name} age={item.age} sex={item.sex}
              oneDiagnosis={()=>oneDiagnosis(item)} controlVisiblity={()=>remove(item)}/>;
            })}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Flex>
  );
}
