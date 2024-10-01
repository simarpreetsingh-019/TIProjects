import { Button, useToast } from '@chakra-ui/react'

export function showToast(type:any, msg: string, desc : string) {
    const toast = useToast()
    return (toast({
        position:'bottom-left',
        title: msg,
        description: desc,
        status : type,
        duration: 4000,
        isClosable: true,
    }))
}