import AuthForm from "../Components/authForm";

import React from 'react'

const Signin = () => {
  return (
    <AuthForm mode='signin' />
  )
}

Signin.authPage = true

export default Signin