import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import GradientLayout from '../Components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

 
function Home({ artists, image }) {
  const [userIsLoaded, setUserIsLoaded] = useState(false)
  const { user, isLoading, isError } = useMe()

  useEffect(() => {
    // if (!currentUser.firstName) {
    //   try {
    //     const userInStorage = JSON.parse(localStorage.getItem("currentUser") || "")
    //     if (userInStorage) {
    //       setUser(userInStorage)
    //     }
    //   } catch (e) {
    //     console.error("currentUser is not in local storage. Error: ", e)
    //   }
    // }

    // Stop loading animation if user has loaded or if the current is a guest (does not have first name)
    if (!isLoading) {
      setUserIsLoaded(true)
    }
  }, [isLoading])

  return (
    <GradientLayout 
      color='gray' 
      subtitle="profile"
      title={isError ? 'Guest' : `${user?.firstName} ${user?.lastName}` } 
      description={isError ? '1 public playlist' : `${user?.playlistsCount} public playlists`}
      image={image}
      roundImage
    >

      <Box color="white" paddingX="2.5rem">
        <Box marginBottom="1rem" marginLeft=".6rem">
          <Text fontSize="2xl" fontWeight="bold">Top artist this month</Text>
          <Box marginTop='1rem'>
            <Text fontSize="md">Only visible to you</Text>
          </Box>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX=".6rem" width="20%" key={artist.name}>
              <Box bg="gray.900" borderRadius="4px" padding="1.2rem" width="100%">
                <SkeletonCircle size='100%' isLoaded={userIsLoaded}>
                  <Image src="https://placekitten.com/300/300" borderRadius="100%"/>
                </SkeletonCircle>
                <Box marginTop="20px">
                  <SkeletonText isLoaded={userIsLoaded}>
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="small">Artist</Text>
                  </SkeletonText>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany()

  const imageId = Math.floor(Math.random() * 1000)
  const image = `https://picsum.photos/400?random=${imageId}`

  return {
    props: { artists, image }
  }
}

export default Home
