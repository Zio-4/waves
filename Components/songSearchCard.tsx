import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/layout'
import Image from 'next/image'
import { formatTime } from '../lib/formatters'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

const SongSearchCard = ({id, artistID, artistName, duration, image, songName, url,}) => {

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
                    <GridItem rowSpan={2}  colSpan={1} colEnd={1}  color='white'>
                        <Image src={image} width={94} height={94}/>
                    </GridItem>
                    <GridItem padding='.8rem'></GridItem>
                    <GridItem colSpan={4} rowStart={2} rowSpan={1} colStart={1} colEnd={4}  color='white'>
                        {songName}
                    </GridItem>
                    <GridItem colSpan={4} rowStart={3} colStart={1} colEnd={4} color='gray'>
                        {artistName}
                    </GridItem>
                    <GridItem rowStart={2} colStart={5} colEnd={5} margin='auto'>
                        < AiOutlineHeart size='1.3rem'/>
                    </GridItem>
                    <GridItem rowStart={2} colSpan={1} colStart={6} color='gray' margin='auto'> 
                        {formatTime(duration)}
                    </GridItem>
                    <GridItem rowStart={2} colStart={7} margin='auto'>
                        <BsThreeDotsVertical size='1.3rem'/>
                    </GridItem>
                </Grid>
            </Box>
          
        </Box>
  )
}

export default SongSearchCard