import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import Image from "next/image"

const Sidebar = () => {
    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" >
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <Image src="/logo/multicolor-wave.svg" height={60} width={120}/>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar