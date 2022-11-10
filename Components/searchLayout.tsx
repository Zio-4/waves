import React, { useEffect, useState } from 'react'
import { Box, Heading, Flex, } from '@chakra-ui/layout'
import { Input, Grid, GridItem, Spinner, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react'
import SongSearchCard from './songSearchCard'
import { FiSearch } from 'react-icons/fi'

const SearchLayout = ({children, color}) => {
  const [allSongs, setAllSongs] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredSongs, setFilteredSongs] = useState([])

  useEffect(() => {
    fetch('/api/songs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json())
        .then(songData => setAllSongs(songData))
  }, [])



  const updateAndParseSearchInput = (e) => {
    setSearchInput(e.target.value)

    const filtered = allSongs.filter(song => song.name.toLowerCase().includes(searchInput.toLowerCase()))

    setFilteredSongs(filtered)

  }

  useEffect(() => {
    if (searchInput.length == 0) {
      setFilteredSongs([])
    }
  }, [searchInput])


  return (
    <Box height="100%" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
      <Heading color='white' textAlign='center' paddingTop='2rem'>Search for some vibes</Heading>

      <Flex justifyContent='center'>
        <Box width='60%' paddingTop='2rem'>
          <InputGroup>
            <InputLeftElement pointerEvents='none' children={<FiSearch color='white'/>}/>

            <Input placeholder='Ex. Ghibli Chillhop' focusBorderColor='none' value={searchInput} onChange={updateAndParseSearchInput} textColor='white'/>
          </InputGroup>
        </Box>
      </Flex>

      <Box width='60%' margin='auto' paddingTop='1.5rem'>
        {allSongs.length ? (filteredSongs.map((song) => {
          return <SongSearchCard id={song.id} 
                  artistID={song.artist.id} 
                  artistName={song.artist.name} 
                  duration={song.duration} 
                  image={song.image} 
                  songName={song.name} 
                  url={song.url}
                  key={song.id}
                />
        })) : null}
      </Box>

      <Flex justifyContent='center'>
        {searchInput.length > 0 && allSongs.length === 0 ? <Spinner size='xl'/> : null}
      </Flex>

    </Box>
  )
}

export default SearchLayout