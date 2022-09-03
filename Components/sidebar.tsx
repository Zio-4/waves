import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay, ListIcon, Stack } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import { usePlaylist } from "../lib/hooks"
import logo from '../public/logo/wave-logo.svg'
import { Skeleton, SkeletonCircle, SkeletonText, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStoreState } from 'easy-peasy'
import { guestPlaylist } from "../lib/guestPlaylist"

const navMenu = [
    { name: 'Home', icon: MdHome, route: '/' },
    { name: 'Search', icon: MdSearch, route: '/' },
    { name: 'Your Library', icon: MdLibraryMusic, route: '/' },
]

const musicMenu = [
    { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
    { name: 'Favorites', icon: MdFavorite, route: '/' },
]


const Sidebar = () => {
    const currentUser = useStoreState((store: any) => store.currentUser)
    const [userPlaylists, setUserPlaylists] = useState([])
    const [playlistsLoading, setPlaylistsLoading] = useState(true)
    const [playlistLoaded, setPlaylistLoaded] = useState(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (currentUser.firstName) {
            const { playlists, isLoading } = usePlaylist()
            setPlaylistsLoading(isLoading)
            setUserPlaylists(playlists)
        }
    }, [currentUser])


    useEffect(() => {
        if (!playlistsLoading) {
            setPlaylistLoaded(true)
        }
    }, [playlistsLoading])


    console.log('Sidebar rerender')

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
                                        <LinkOverlay color={id === undefined && menu.name === 'Home' ? 'white' : 'gray'}>
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
                    
                        {playlistLoaded && userPlaylists.map((playlist, i) => (
                            <ListItem paddingX="20px" key={playlist.id}>
                                <LinkBox>
                                        <Link href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: playlist.id }
                                            }}
                                            passHref
                                        >
                                            <LinkOverlay color={playlist.id === +id ? 'white' : 'gray'}>
                                                {playlist.name}
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