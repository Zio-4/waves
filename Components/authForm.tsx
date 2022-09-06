import React, { FC, useState, useEffect } from 'react'
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'
import Image from 'next/image'
import logo from '../public/logo/wave-logo.svg'
import Link from 'next/link'
import { useStoreActions } from 'easy-peasy'

const AuthForm: FC<{ mode: 'signup' | 'signin' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const setFavoriteSongsInStore = useStoreActions((store: any) => store.setFavoriteSongs)
    const setCurrentUser = useStoreActions((store: any) => store.setCurrentUser)

    useEffect(() => {
      return () => {
        setIsLoading(false)
      }
    }, [])
    

const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === 'signup') {
        if (!email || !firstName || !lastName || !password || !confirmPassword) return
    } else if (!email || !password) {
        return
    }

    setIsLoading(true)
    
    const user = await auth(mode, { email, password, firstName, lastName })

    setFavoriteSongsInStore(user.favorites)
    localStorage.setItem('WAVES_FAVORITE_SONGS', JSON.stringify(user.favorites))

    let currUser = {firstName: user.firstName, lastName: user.lastName,}
    setCurrentUser(currUser)
    localStorage.setItem('currentUser', JSON.stringify(currUser))

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
                        <Input borderRadius='2rem' bg='white' textColor='black' placeholder='Password' type='password' autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    {mode === 'signup' ? (
                    <Box>
                        <Box paddingBottom='1rem'>
                            <Input borderRadius='2rem' bg='white' textColor='black' placeholder='Confirm Password' type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Box>
                        <Box paddingBottom='1rem'>
                            <Input borderRadius='2rem' bg='white' textColor='black' placeholder='First Name' type='text' onChange={(e) => setFirstName(e.target.value)} />
                        </Box>
                        <Box paddingBottom='1rem'>
                            <Input borderRadius='2rem' bg='white' textColor='black' placeholder='Last Name' type='text' onChange={(e) => setLastName(e.target.value)} />
                        </Box>
                    </Box>
                    ) : null}
                    <Box >
                        <Button width='100%' borderRadius='2rem' type='submit' bg='green.400' isLoading={isLoading} sx={{'&:hover': { bg: 'green.300'}}}>{mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}</Button>
                    </Box>
                </form>

                <Box paddingTop='2rem'>
                    {mode === 'signin' ? (
                        <Box textAlign='center'>Don't have an account? {<Link href='/signup' ><Text display='inline' cursor='pointer' decoration='underline' textUnderlineOffset='0.2rem'>SIGN UP</Text></Link>}</Box> 
                    ) : (
                        <Box textAlign='center'>Aleady have an account? {<Link href='/signin'><Text display='inline' cursor='pointer' decoration='underline' textUnderlineOffset='0.2rem'>SIGN IN</Text></Link>}</Box>
                    )}      
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default AuthForm