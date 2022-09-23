import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import GradientLayout from '../Components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

 
function Home({ artists, image }) {
  const [isDoneLoading, setIsDoneLoading] = useState(false)
  const { user, isLoading, isError } = useMe()
  // const [userIsGuest, setUserIsGuest] = useState(true)
  const currentUser = useStoreState((store: any) => store.currentUser)

  useEffect(() => {
    // Stop loading animation if user has loaded or if the current is a guest (does not have first name)
    if (!isLoading) {
      setIsDoneLoading(true)
    }
  }, [isLoading])

  const topArtists = artists.slice(0, 6)

  console.log('user', user)
  console.log('current user', currentUser)

  return (
    <GradientLayout 
      color='gray' 
      subtitle="profile"
      title={currentUser.firstName ? `${user?.firstName} ${user?.lastName}` : 'Guest'} 
      description={currentUser.firstName ? `${user?.playlistsCount} public playlists` : '1 public playlist'}
      image={image}
      roundImage
      userIsDoneLoading={isDoneLoading}
    >

      <Box color="white" paddingX="2.5rem">
        <Box marginBottom="1rem" marginLeft=".6rem">
          <Text fontSize="2xl" fontWeight="bold">Top artist this month</Text>
          <Box marginTop='1rem'>
            <Text fontSize="md">Only visible to you</Text>
          </Box>
        </Box>
        <Flex>
          {topArtists.map((artist) => (
            <Box paddingX=".6rem" width="20%" key={artist.name}>
              <Box bg="gray.900" borderRadius="4px" padding="1.2rem" width="100%">
                <SkeletonCircle size='100%' isLoaded={isDoneLoading}>
                  <Image src="https://placekitten.com/300/300" borderRadius="100%"/>
                </SkeletonCircle>
                <Box marginTop="20px">
                  <SkeletonText isLoaded={isDoneLoading}>
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
