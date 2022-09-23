import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay, ListIcon, Stack } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import { usePlaylist } from "../lib/hooks"
import logo from '../public/logo/wave-logo.svg'
import { Skeleton, SkeletonCircle, SkeletonText, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { guestPlaylist } from "../lib/guestPlaylist"

const navMenu = [
    { name: 'Home', icon: MdHome, route: '/' },
    { name: 'Search', icon: MdSearch, route: '/search' },
    { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const musicMenu = [
    { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/createplaylist' },
    { name: 'Favorites', icon: MdFavorite, route: '/favorites' },
]


const Sidebar = () => {
    const currentUser = useStoreState((store: any) => store.currentUser)
    const setUser = useStoreActions((store: any) => store.setCurrentUser)
    const { playlists, isLoading, isError } = usePlaylist()
    const [isDoneLoading, setIsDoneLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const pathname = router.pathname

    useEffect(() => {
        if (!currentUser.firstName) {
            try {
                let userInStorage = JSON.parse(localStorage.getItem('currentUser') || '')
                setUser(userInStorage)
            } catch(e) {
                // user is a guest and there is no currentUser object in localStorage
            }
        }

        if (playlists || isError) {
            setIsDoneLoading(true)
        }
    }, [playlists, isError])


    // Cannot rely on isError due to the route function handler being wrapped in another handler

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
                                        <LinkOverlay color={menu.route === pathname ? 'white' : 'gray'}>
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
                                        <LinkOverlay color={pathname === menu.route ? 'white' : 'gray'}>
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

                        {!currentUser.firstName && (
                            <ListItem paddingX="20px" key={guestPlaylist.id}>
                                <LinkBox>
                                        <Link href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: guestPlaylist.id }
                                            }}
                                            passHref
                                        >
                                            <LinkOverlay color={guestPlaylist.id === id ? 'white' : 'gray'}>
                                                {guestPlaylist.name}
                                            </LinkOverlay>
                                        </Link>
                                </LinkBox>
                            </ListItem>
                        )}
                    
                        {playlists.length > 1 && playlists.map((playlist, i) => (
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

                        {!isDoneLoading && (
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