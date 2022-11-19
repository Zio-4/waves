import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/layout'
import Image from 'next/image'
import { formatTime } from '../lib/formatters'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useStoreActions, useStoreState } from 'easy-peasy'

const SongSearchCard = ({id, artistID, artistName, duration, image, songName, url, userFavoriteSongs}) => {
    const addSongToFavorites = useStoreActions((store: any) => store.addToFavorites)
    const removeSongFromFavorites = useStoreActions((store: any) => store.removeFromFavorites)
    const user = useStoreState((store: any) => store.currentUser)

    const handleAddSong = async (songId: number) => {
        addSongToFavorites(songId)

        const res = await fetch('/api/favorites', {
          method: 'PATCH',
          body: JSON.stringify({songId: songId}),
          headers: { 'Content-type': 'application/json' }
        })
          .then(r => r.json())
          .then(response => console.log('Response from adding song', response))
          .catch(e => console.error(e))
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
    }

    console.log('type of userFavorites: ', userFavoriteSongs)

  return (
        <Box  marginY='1rem'>
            <Box borderStyle='solid' borderWidth='thin' borderColor='black' bg='black' borderRadius='md' height='6rem'>
                <Grid
                    h='2.5rem'
                    templateRows='repeat(3, 1fr)'
                    templateColumns='repeat(7, 1fr)'
                    gap={2}
                    marginBottom='1rem'
                >
                    <GridItem rowSpan={2}  colSpan={1} colEnd={1}  color='white' overflow='clipped'>
                        <Image src={image} width={94} height={94}/>
                    </GridItem>
                    <GridItem padding='.8rem'></GridItem>
                    <GridItem colSpan={4} rowStart={2} rowSpan={1} colStart={1} colEnd={4}  color='white'>
                        {songName}
                    </GridItem>
                    <GridItem colSpan={4} rowStart={3} colStart={1} colEnd={4} color='gray'>
                        {artistName}
                    </GridItem>

                    {user.firstName ? (
                        <GridItem rowStart={2} colStart={5} colEnd={5} margin='auto'>
                            {userFavoriteSongs.includes(id) ? <div><AiFillHeart size='1.3rem' onClick={() => handleRemoveSong(id)} cursor='pointer' color='green'/></div> : <div><AiOutlineHeart size='1.3rem' onClick={() => handleAddSong(id)} cursor='pointer' color='gray'/></div>}
                        </GridItem>
                    ) : null}

                    <GridItem rowStart={2} colSpan={1} colStart={6} color='gray' margin='auto'> 
                        {formatTime(duration)}
                    </GridItem>
                    <GridItem rowStart={2} colStart={7} margin='auto'>
                        <BsThreeDotsVertical size='1.3rem' cursor='pointer' color='gray'/>
                    </GridItem>
                </Grid>
            </Box>
          
        </Box>
  )
}

export default SongSearchCard