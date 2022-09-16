import React from 'react'

const GetSongs = () => {
    fetch('https://lofi-api.herokuapp.com/v1/track/popular?limit=100')
        .then(r => r.json())
        .then(data => console.log(data))
        
  return (
    <div>GetSongs</div>
  )
}

export default GetSongs