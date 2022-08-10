import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay, ListIcon } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import { usePlaylist } from "../lib/hooks"

const navMenu = [
    { name: 'Home', icon: MdHome, route: '/' },
    { name: 'Search', icon: MdSearch, route: '/search' },
    { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const musicMenu = [
    { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
    { name: 'Favorites', icon: MdFavorite, route: '/favorites' },
]


// Refactor ListItems into sepearte component

const Sidebar = () => {
    const { playlists } = usePlaylist()
    console.log(playlists)

    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <Image src="/logo/multicolor-wave.svg" height={60} width={120}/>
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
                    <List spacing={2}>
                        {playlists.map((playlist) => (
                            <ListItem paddingX="20px" key={playlist.id}>
                                <LinkBox>
                                    <Link href={{
                                        pathname: '/playlist/[id]',
                                        query: { id: playlist.id }
                                        }}
                                        passHref
                                    >
                                        <LinkOverlay>
                                            {playlist.name}
                                        </LinkOverlay>
                                    </Link>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar