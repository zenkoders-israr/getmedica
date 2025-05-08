import React from 'react'
import AuthWrapper from '../components/features/Auth/AuthWrapper'
import SignupForm from '../components/features/Auth/SignupForm'
function Signup() {
  return (
    <AuthWrapper title='Signup'>
      <SignupForm />
    </AuthWrapper>
  )
}

export default Signup