import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/layout'

const SongSearchCard = ({song}) => {
  return (
        <Box borderStyle='solid' borderWidth='thin' borderColor='black' bg='black' borderRadius='md' padding='1rem' marginY='1rem'>
          <Grid
              h='3rem'
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={1}
            >
              <GridItem rowSpan={2} bg='tomato' colSpan={1} colEnd={1}  color='white'>
                Album Art here
              </GridItem>
              <GridItem colSpan={2}  color='white'>
                {song}
              </GridItem>
              <GridItem colSpan={4}  color='gray'>
                Artists name
              </GridItem>
              <GridItem colSpan={1} colStart={6} color='gray'> 
                Song time
              </GridItem>
          </Grid>
        </Box>
  )
}

export default SongSearchCard