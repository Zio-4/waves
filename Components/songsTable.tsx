import { Box } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { expectsResolvedDragConstraints } from 'framer-motion/types/gestures/drag/VisualElementDragControls'


const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const addSongToFavorites = useStoreActions((store: any) => store.addToFavorites)
  const removeSongFromFavorites = useStoreActions((store: any) => store.removeFromFavorites)
  const setFavoriteSongs = useStoreActions((store: any) => store.setFavoriteSongs)
  const favoriteSongs = useStoreState((store: any) => store.favoriteSongs)
  const currentUser = useStoreState((store: any) => store.currentUser)
  const router = useRouter()
  const { id } = router.query

  interface ISong {
    artist: {
      name: string
      id: number
    }
    artistId: number
    createdAt: Date
    duration: number
    id: number
    name: string
    updatedAt: Date
    url: string
  }


  useEffect(() => {
      try {
        const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
        setFavoriteSongs(parsedFavoriteSongs)
      } catch(e) {
        console.log('Favorite songs are not in localStorage')
      } 
  }, [])

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0])
    playSongs(songs)
  }

  const handleAddSong = async (song: ISong) => {
    const songUpdated = {...song, updatedAt: new Date()}

    addSongToFavorites(songUpdated)

    const res = await fetch('/api/favorites', {
      method: 'PATCH',
      body: JSON.stringify({songObject: songUpdated}),
      headers: { 'Content-type': 'application/json' }
    })
      .then(r => r.json())
      .then(response => console.log('Response from adding song', response))
      .catch(e => console.error(e))
    
    // Update localStorage
    const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
    parsedFavoriteSongs.push(songUpdated)
    localStorage.setItem('WAVES_FAVORITE_SONGS', JSON.stringify(parsedFavoriteSongs))
  }

  const handleRemoveSong = async (songId: number) => {
    removeSongFromFavorites(songId)

    const res = await fetch('/api/favorites', {
      method: 'DELETE',
      body: JSON.stringify({songId: songId}),
      headers: { 'Content-type': 'application/json' }
    })
      .then(r => r.json())
      .then(response => console.log('Response from deleting song', response))
      .catch(e => console.error(e))
       
    // Update localStorage
    const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
    const songRemovedFavorites = parsedFavoriteSongs.filter(song => song.id !== songId)
    localStorage.setItem('WAVES_FAVORITE_SONGS', JSON.stringify(songRemovedFavorites))
  }

  // console.log('current User ins songs table: ', currentUser)
  console.log('favorite songs', favoriteSongs)

  function songIsInFavorites(songId: number): boolean{
    for (let i = 0; i < favoriteSongs.length; i++) {
      if (favoriteSongs[i].id === songId ) return true
    }   
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              {currentUser.firstName ? <Th></Th> : null}
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    bg: 'rgba(255,255,255, 0.1)',
                  },
                }}
                // change back to song id after done testing
                key={song.id}
                cursor="pointer"
              >
                <Td onClick={() => handlePlay(song)}>{i + 1}</Td>
                <Td onClick={() => handlePlay(song)}>{song.name}</Td>
                <Td onClick={() => handlePlay(song)}>{currentUser.firstName && id !== 'favorites' ? formatDate(song.createdAt) : 'Aug 8, 2022'}</Td>
                {currentUser.firstName ? (
                  <Td paddingRight="0" width="1rem">
                    {songIsInFavorites(song.id) ? <AiFillHeart onClick={() => handleRemoveSong(song.id)}/> : <AiOutlineHeart onClick={() => handleAddSong(song)} />}
                  </Td>
                  ) : null
                }
                <Td onClick={() => handlePlay(song)}>
                  {id === 'favorites' ? '1:00' : formatTime(song.duration)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
