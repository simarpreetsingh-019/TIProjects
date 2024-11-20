import { signIn } from 'next-auth/react'

const UserLoginButton = () => {
  return (
    <button className={`mx-6 py-2 px-4 bg-white text-black rounded-xl`} onClick={() => signIn('github', { callbackUrl: '/', role: 'user' })}>
      User Login
    </button>
  )
}

export default UserLoginButton
