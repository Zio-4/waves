import GradientLayout from "../Components/gradientLayout"
import SongTable from "../Components/songsTable"
import { useStoreState } from "easy-peasy"

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

const Favorites = () => {
    const color = getBGColor()
    const favoriteSongs = useStoreState((store: any) => store.favoriteSongs)

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
      <SongTable songs={favoriteSongs} />
    </GradientLayout>
  )
}

export default Favorites