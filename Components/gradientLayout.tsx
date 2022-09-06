import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Image, Skeleton, SkeletonCircle, Stack} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStoreState } from 'easy-peasy'
import { route } from 'next/dist/server/router'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
  userIsDoneLoading
}) => {
  const [userIsLoaded, setUserIsLoaded] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const currentUser = useStoreState((store: any) => store.currentUser)

  // useEffect(() => {
  //   if (userIsDoneLoading) {
  //     setUserIsLoaded(true)
  //   }
  // }, [userIsDoneLoading])
  // console.log('title in gradient layout :', title)

  const handleButton = () => {
    if (currentUser.firstName) signOut()
    else {
      router.push('/signin')
    }
  }

  // Add modal to check if user wants to sign out? 
  const signOut = () => {
    fetch('/api/signout')
      .then((r) => r.json())
      .then((data) => console.log('signout response: ', data))
      .catch(e => console.error(e))
    localStorage.removeItem('currentUser')
    router.push('/signin')
  }

  // console.log('current User in gradient layout :', currentUser)


  return (
    <Box height="100%" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
        <Flex bg={`${color}.600`} justify="end">
          <Box paddingTop="1rem" paddingRight="3rem">
            <Button colorScheme='blackAlpha' rounded='2rem' size="sm" onClick={handleButton}>
              {currentUser.firstName ? 'Sign Out' : 'Sign In / Create account'}
            </Button>
          </Box>
        </Flex>

        <Flex bg={`${color}.600`} paddingX="40px" paddingBottom="40px" align="end">
              <Box padding="20px">
                <SkeletonCircle size='40' isLoaded={userIsDoneLoading}>
                  <Image boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? '100%' : '3px'}/>
                </SkeletonCircle>
              </Box>

              <Box padding="20px" lineHeight="40px" color="white">
                <Stack spacing={1}>
                  <Skeleton isLoaded={userIsDoneLoading}>
                    <Text fontSize="small" fontWeight="bold" casing="uppercase">
                      {subtitle}
                    </Text>
                  </Skeleton>
                  
                  <Skeleton isLoaded={userIsDoneLoading}>
                    <Text fontSize="6xl" fontWeight='extrabold' marginTop='none'>
                      {title}
                    </Text>
                  </Skeleton>
                  
                  <Skeleton isLoaded={userIsDoneLoading}>
                    <Text fontSize="small" >
                      {description}
                    </Text>
                  </Skeleton>
                </Stack>
              </Box>

        </Flex>
        <Box paddingY="50px">
          {children}
        </Box>
    </Box>
  )
}

export default GradientLayout