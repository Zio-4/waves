import GradientLayout from "../../Components/gradientLayout"
import SongTable from "../../Components/songsTable"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const getBGColor = (id) => {
    const colors = ['red', 'green', 'blue','orange', 'purple', 'yellow', 'teal']

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
    const color = getBGColor(playlist.id)

  return (
    <GradientLayout 
        color={color} 
        roundImage={false} 
        title={playlist.name} 
        subtitle="playlist" 
        description={`${playlist.songs.length} song(s)`}
        image={`https://picsum.photos/400?random=${playlist.id}`}
    >
        <SongTable songs={playlist.songs}/>
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookies.WAVES_ACCESS_TOKEN)

    // Using find many to make sure the playlist is the right one AND belongs to the current user
    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.id,
            userId: id
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    })

    return {
        props: { playlist }
    }
}

export default Playlist