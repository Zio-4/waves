import { Box } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const addSongToFavorites = useStoreActions((store: any) => store.addToFavorites)
  const removeSongFromFavorites = useStoreActions((store: any) => store.removeFromFavorites)
  // const setFavoriteSongs = useStoreActions((store: any) => store.setFavoriteSongs)
  const favoriteSongs = useStoreState((store: any) => store.favoriteSongs)
  const currentUser = useStoreState((store: any) => store.currentUser)
  const router = useRouter()
  const { pathname } = router
  const [songsState, setSongsState] = useState([])

  useEffect(() => {
    setSongsState(songs)
  }, [])


  // interface ISong {
  //   artist: {
  //     name: string
  //     id: number
  //   }
  //   artistId: number
  //   createdAt: Date
  //   duration: number
  //   id: number
  //   name: string
  //   updatedAt: Date
  //   url: string
  //   image: string
  // }


  // useEffect(() => {
  //     try {
  //       const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
  //       setFavoriteSongs(parsedFavoriteSongs)
  //     } catch(e) {
  //       console.log('Favorite songs are not in localStorage')
  //     } 
  // }, [])


  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0])
    playSongs(songs)
  }

  const handleAddSong = async (songID: number) => {

    addSongToFavorites(songID)

    const res = await fetch('/api/favorites', {
      method: 'PATCH',
      body: JSON.stringify({songId: songID}),
      headers: { 'Content-type': 'application/json' }
    })
      .then(r => r.json())
      .then(response => console.log('Response from adding song', response))
      .catch(e => console.error(e))
    
    // Update localStorage
    // const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
    // parsedFavoriteSongs.push(songID)
    // localStorage.setItem('WAVES_FAVORITE_SONGS', JSON.stringify(parsedFavoriteSongs))
  }

  const handleRemoveSong = async (songId: number) => {
    removeSongFromFavorites(songId)

    if (pathname === '/favorites') {
      setSongsState(prev => prev.filter(song => song.id !== songId))
    }

    const res = await fetch('/api/favorites', {
      method: 'DELETE',
      body: JSON.stringify({songId: songId}),
      headers: { 'Content-type': 'application/json' }
    })
      .then(r => r.json())
      .then(response => console.log('Response from deleting song', response))
      .catch(e => console.error(e))
       
    // Update localStorage
    // const parsedFavoriteSongs = JSON.parse(localStorage.getItem('WAVES_FAVORITE_SONGS') || '')
    // const songRemovedFavorites = parsedFavoriteSongs.filter(song => song.id !== songId)
    // localStorage.setItem('WAVES_FAVORITE_SONGS', JSON.stringify(songRemovedFavorites))
  }

  // console.log('current User ins songs table: ', currentUser)

  // function songIsInFavorites(songId: number): boolean{
  //   for (let i = 0; i < favoriteSongs.length; i++) {
  //     if (favoriteSongs[i].id === songId ) return true
  //   }   
  // }

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
            {songsState.map((song, i) => (
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
                <Td onClick={() => handlePlay(song)}>{currentUser.firstName ? formatDate(song.createdAt) : 'Aug 8, 2022'}</Td>
                {currentUser.firstName ? (
                  <Td paddingRight="0" width="1rem">
                    {favoriteSongs.includes(song.id) || pathname === '/favorites' ? <AiFillHeart onClick={() => handleRemoveSong(song.id)}/> : <AiOutlineHeart onClick={() => handleAddSong(song.id)} />}
                  </Td>
                  ) : null
                }
                <Td onClick={() => handlePlay(song)}>
                  {/* {pathname === 'favorites' ? '1:00' : formatTime(song.duration)} */}
                  {formatTime(song.duration)}
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
