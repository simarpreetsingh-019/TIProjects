import { signIn } from 'next-auth/react'

const AdminLoginButton = () => {
  return (
    <button className={`mx-6 py-2 px-4 bg-white text-black rounded-xl`} onClick={() => signIn('github', { callbackUrl: '/', role: 'admin' })}>
      Maintainer Login
    </button>
  )
}

export default AdminLoginButton
