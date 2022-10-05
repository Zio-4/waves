import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/layout'
import Image from 'next/image'

const SongSearchCard = ({id, artistID, artistName, duration, image, songName, url,}) => {

    console.log(image)

  return (
        <Box borderStyle='solid' borderWidth='thin' borderColor='black' bg='black' borderRadius='md' padding='1rem' marginY='1rem'>
          <Grid
              h='3rem'
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={1}
            >
              <GridItem rowSpan={2} bg='tomato' colSpan={1} colEnd={1}  color='white'>
                <Image src={image} width={100} height={100}/>
              </GridItem>
              <GridItem colSpan={2}  color='white'>
                {songName}
              </GridItem>
              <GridItem colSpan={4}  color='gray'>
                {artistName}
              </GridItem>
              <GridItem colSpan={1} colStart={6} color='gray'> 
                {duration}
              </GridItem>
          </Grid>
        </Box>
  )
}

export default SongSearchCard