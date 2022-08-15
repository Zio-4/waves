import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import GradientLayout from '../Components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'
import { useEffect, useState } from 'react'

const profilePicId = Math.floor(Math.random() * 1000)

 
function Home({ artists }) {
  const [userIsLoaded, setUserIsLoaded] = useState(false)
  const { user, isLoading } = useMe()

  useEffect(() => {
    if (!isLoading) {
      setUserIsLoaded(true)
    }
  }, [isLoading])

  return (
    <GradientLayout 
      color='gray' 
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`} 
      description={`${user?.playlistsCount - 1} public playlists`}
      image={`https://picsum.photos/400?random=${profilePicId}`}
      roundImage
    >

      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">Top artist this month</Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={artist.name}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <SkeletonCircle size='40' isLoaded={userIsLoaded}>
                  <Image src="https://placekitten.com/300/300" borderRadius="100%"/>
                </SkeletonCircle>
                <Box marginTop="20px">
                  <SkeletonText isLoaded={userIsLoaded}>
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="x-small">Artist</Text>
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

  return {
    props: { artists }
  }
}

export default Home
