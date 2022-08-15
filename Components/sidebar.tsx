import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay, ListIcon, Stack } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import { usePlaylist } from "../lib/hooks"
import logo from '../public/logo/wave-logo.svg'
import { Skeleton, SkeletonCircle, SkeletonText, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const navMenu = [
    { name: 'Home', icon: MdHome, route: '/' },
    { name: 'Search', icon: MdSearch, route: '/' },
    { name: 'Your Library', icon: MdLibraryMusic, route: '/' },
]

const musicMenu = [
    { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
    { name: 'Favorites', icon: MdFavorite, route: '/' },
]

// Refactor ListItems into sepearte component

const Sidebar = () => {
    const { playlists, isLoading } = usePlaylist()
    const [playlistLoaded, setPlaylistLoaded] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query
    console.log(typeof  id)

    useEffect(() => {
        if (!isLoading) {
            setPlaylistLoaded(true)
        }
    }, [isLoading])

    useEffect(() => {
        return () => setPageLoading(false)
    }, [])

    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <Image src={logo} height={60} width={120}/>
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {navMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                <LinkBox>
                                    <Link href={menu.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon as={menu.icon} color="white" marginRight="20px" />
                                            {menu.name}
                                        </LinkOverlay>
                                    </Link>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box marginTop="20px">
                    <List spacing={2}>
                        {musicMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                <LinkBox>
                                    <Link href={menu.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon as={menu.icon} color="white" marginRight="20px" />
                                            {menu.name}
                                        </LinkOverlay>
                                    </Link>
                                </LinkBox>      
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Divider color="gray.800"/>
                <Box height="66%" overflowY="auto" paddingY="20px">
                    <Skeleton />

                    <List spacing={2}>
                    
                        {playlistLoaded && playlists.map((playlist) => (
                                <ListItem paddingX="20px" key={playlist.id}>
                                    <LinkBox>
                                            <Link href={{
                                                pathname: '/playlist/[id]',
                                                // query: { id: playlist.id }
                                                query: {id: parseInt(playlist.name[playlist.name.length - 1])}
                                                }}
                                                passHref
                                            >
                                                <LinkOverlay color={playlist.name[playlist.name.length - 1] === id ? 'white' : 'gray'}>
                                                    {playlist.id !== 7 ? playlist.name : null}
                                                </LinkOverlay>
                                            </Link>
                                    </LinkBox>
                                </ListItem>
                        ))}

                        {!playlistLoaded && (
                            <Stack>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                                <Skeleton >1</Skeleton>
                            </Stack>
                        )}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar