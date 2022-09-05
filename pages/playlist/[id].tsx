import GradientLayout from '../../Components/gradientLayout'
import SongTable from '../../Components/songsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import { guestPlaylist } from '../../lib/guestPlaylist'

const getBGColor = () => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ userPlaylist }) => {
  const color = getBGColor()

  console.log('playlist: ', userPlaylist)

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={userPlaylist ? userPlaylist.name : guestPlaylist.name}
      subtitle="playlist"
      description={userPlaylist ? `${userPlaylist.songs.length} songs` : '6 songs'}
      image={userPlaylist ? `https://picsum.photos/400?random=${userPlaylist.id}` : 'https://picsum.photos/400?random=1'}
    >
      <SongTable songs={userPlaylist ? userPlaylist.songs : guestPlaylist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user

  if (query.id !== 'guest') {
    try {
      user = validateToken(req.cookies.WAVES_ACCESS_TOKEN)
    } catch (e) {
      console.error(e)
    }
  }
  
  let userPlaylist

  if (user) {
    const [playlist] = await prisma.playlist.findMany({
      where: {
        id: +query.id,
        userId: user.id,
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

    userPlaylist = playlist
  } 

  return {
    props: { userPlaylist },
  }
}
export default Playlist