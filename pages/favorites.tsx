import GradientLayout from "../Components/gradientLayout"
import SongTable from "../Components/songsTable"
import prisma from "../lib/prisma"
import { validateToken } from "../lib/auth"

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

const Favorites = ({ favoriteSongs }) => {
    const color = getBGColor()

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title='Favorites'
      subtitle="playlist"
      description={favoriteSongs.length}
      image={'https://picsum.photos/400?random=1'}
      userIsDoneLoading
    >
      <SongTable songs={favoriteSongs.favorites} />
    </GradientLayout>
  )
}

export async function getServerSideProps({ req }) {
  let user

  try {
    user = validateToken(req.cookies.WAVES_ACCESS_TOKEN)
  } catch (e) {
    console.error(e)
  }


  const favoriteSongs = await prisma.user.findUnique({
    where: {
      id: user.id,
    }, 
    select: {
      favorites: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      }
    }
  })

  return {
    props: { favoriteSongs }
  }
}

export default Favorites