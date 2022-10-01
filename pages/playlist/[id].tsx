import GradientLayout from '../../Components/gradientLayout'
import SongTable from '../../Components/songsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import { guestPlaylist } from '../../lib/guestPlaylist'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

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

const Playlist = ({ userPlaylist, favoriteSongsByID }) => {
  const color = getBGColor()
  const setFavorites = useStoreActions((store: any) => store.setFavoriteSongs)

  useEffect(() => {
    if (favoriteSongsByID) {
      setFavorites(favoriteSongsByID.favorites)
    }
  }, [])


  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={userPlaylist ? userPlaylist.name : guestPlaylist.name}
      subtitle="playlist"
      description={userPlaylist ? `${userPlaylist.songs.length} songs` : '6 songs'}
      image={userPlaylist ? `https://picsum.photos/400?random=${userPlaylist.id}` : 'https://picsum.photos/400?random=1'}
      userIsDoneLoading
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
  let favoriteSongsByID

  if (user) {
    const [playlist] = await prisma.playlist.findMany({
      where: {
        id: +query.id,
        userId: user.id,
      },
      include: {
        songs: {
          orderBy: {
            id: 'asc'
          },
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

    favoriteSongsByID = await prisma.user.findUnique({
      where: {
        id: user.id,
      }, 
      select: {
        favorites: {
          select: {
            id: true
          }
        }
      }
    })
    
    // turning an array of objects to an array of id's for easier use on the frontend
    for(let i = 0; i < favoriteSongsByID.favorites.length; i++) {
      favoriteSongsByID.favorites[i] = favoriteSongsByID.favorites[i].id
    }
  } 

  return {
    props: { userPlaylist, favoriteSongsByID },
  }
}
export default Playlist