import AuthForm from "../Components/authForm";
import React from 'react'

const Signin = () => {
  return (
    <div>
      <AuthForm mode='signin' />
    </div>
  )
}

Signin.authPage = true

export default Signin