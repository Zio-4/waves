import AuthForm from "../Components/authForm";
import GetSongs from "../Components/GetSongs"
import React from 'react'

const Signin = () => {
  return (
    <div>
      <AuthForm mode='signin' />
      <GetSongs />
    </div>
  )
}

Signin.authPage = true

export default Signin