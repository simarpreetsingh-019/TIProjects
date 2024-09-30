import React from 'react'
import { Stack, Text, Button, useColorModeValue } from '@chakra-ui/react'
import {BsGenderFemale, BsGenderMale, BsGenderAmbiguous} from 'react-icons/bs'

interface ICardProps {
    title?:string,
    sex?:string,
    age?:string,
    // aesEncryption:string,
    // aesDecrypted:string,
    // item:any,
    oneDiagnosis?:any,
    controlVisiblity?:any,
    speciality?:string,
    ishospital?:boolean
}
// export default function Card({item,title,sex,age,aesEncryption,aesDecrypted,oneDiagnosis, controlVisiblity, speciality, ishospital}:ICardProps) {
export default function Card({title,sex,age,oneDiagnosis, controlVisiblity, speciality, ishospital}:ICardProps) {

  return (
    <Stack bg={useColorModeValue('gray.700', 'gray.600')}
    p="4" boxShadow="lg" m="4" borderRadius="sm" maxW={'20vw'} 
    style={{transition:'0.5s all ease', cursor:'pointer'}}
    _hover={{transform:'scale(1.05)'}}>
      <Stack direction="row" alignItems="center" >
        <Text color="white" fontWeight="semibold" style={{fontSize:"1.5rem",display:"flex", flexDirection:"row"
    ,padding:"0.5rem"}}>{title} &nbsp;
        {sex==='male' ? <BsGenderMale color='blue' fontWeight={600}/> : sex==='female' ? <BsGenderFemale color='pink' fontWeight={600}/> : <BsGenderAmbiguous color='orange' fontWeight={600}/>}
           {sex}</Text>
      </Stack>

      <Stack  direction={{ base: 'column' }} justifyContent="space-between">
     { speciality!==undefined && <Text color="white" fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Specility: <b>{speciality}</b>  
        </Text>  }
        <Text color="white" fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Age: <b>{age}</b> years 
        </Text>  
        <Stack direction={{ base: 'column', md: 'row' }}>
          {speciality===undefined && <Button variant="outline" colorScheme="green" onClick={oneDiagnosis} >
            Show More
          </Button>}
         {ishospital===undefined && <Button colorScheme="red" onClick={controlVisiblity}>
            {        speciality===undefined ? <>Delete</>: <>Revoke Access</>}
            </Button>
            }
        </Stack>
      </Stack>
    </Stack>
  )
}