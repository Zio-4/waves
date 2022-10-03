import React from 'react'
import { Box, Heading, Flex } from '@chakra-ui/layout'
import { Input, Grid, GridItem } from '@chakra-ui/react'
import SongSearchCard from './songSearchCard'

const songs = ['test', 'another', 'test', 'okay']


const SearchLayout = ({children, color}) => {
  return (
    <Box height="100%" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
      <Heading color='white' textAlign='center' paddingTop='2rem'>Search for songs to listen to</Heading>

      <Flex justifyContent='center'>
        <Box width='80%' paddingTop='2rem'>
          <Input placeholder='Ex. Ghibli Chillhop'/>
        </Box>
      </Flex>

      <Box width='80%' margin='auto' paddingTop='1.5rem'>
        {songs.map((song) => {
          return <SongSearchCard song={song}/>
        })}


      </Box>
    </Box>
  )
}

export default SearchLayout