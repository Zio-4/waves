import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const GradientLayout = ({color, children, image, subtitle, title, description, roundImage,}) => {
  const [userIsLoaded, setUserIsLoaded] = useState(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!title.includes('undefined')) {
      setUserIsLoaded(true)
    }
  }, [title])



  return (
    <Box height="100%" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
        <Flex bg={`${color}.600`} padding="40px" align="end">

              <Box padding="20px">
                <SkeletonCircle size='40' isLoaded={userIsLoaded}>
                  <Image boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? '100%' : '3px'}/>
                </SkeletonCircle>
              </Box>

              <Box padding="20px" lineHeight="40px" color="white">
                <Stack spacing={1}>
                  <Skeleton isLoaded={userIsLoaded}>
                    <Text fontSize="small" fontWeight="bold" casing="uppercase">
                      {subtitle}
                    </Text>
                  </Skeleton>
                  
                  <Skeleton isLoaded={userIsLoaded}>
                    <Text fontSize="6xl" fontWeight='extrabold' marginTop='none'>
                      {title}
                    </Text>
                  </Skeleton>
                  
                  <Skeleton isLoaded={userIsLoaded}>
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