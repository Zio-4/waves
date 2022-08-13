import React, { FC, useState } from 'react'
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'
import Image from 'next/image'
import logo from '../public/logo/wave-logo.svg'
import Link from 'next/link'

const AuthForm: FC<{ mode: 'signup' | 'signin' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const user = await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
}

  return (
    <Box height='100vh' width='100vw' bg='black' color='white'>
        <Flex justify='center' align='center' height='100px' borderBottom='white 1px solid' >
            <Image src={logo} height={60} width={120}/>
        </Flex>
        <Flex justify='center' align='center' height='calc(100vh - 100px)'>
            <Box padding='5rem' bg='gray.900' borderRadius='1rem' width='30rem'>
                <Box paddingBottom='3rem'>
                    <Text textAlign='center' fontSize='4xl'>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Text>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box paddingBottom='1rem'>
                        <Input borderRadius='2rem' bg='white' textColor='black' placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Box paddingBottom='1rem'>
                        <Input borderRadius='2rem' bg='white' textColor='black' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Box >
                        <Button width='100%' borderRadius='2rem' type='submit' bg='green.400' isLoading={isLoading} sx={{'&:hover': { bg: 'green.300'}}}>{mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}</Button>
                    </Box>
                </form>

                <Box  display={ mode === 'signin' ? 'block' : 'none' } paddingTop='2rem'>
                    <Text textAlign='center'>Don't have an account? <Link href='/signup'>SIGN UP</Link></Text>
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default AuthForm