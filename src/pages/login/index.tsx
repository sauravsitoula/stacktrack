import { FormEvent, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import RootLayout from '../../componets/layout'
import { UserContext } from '../_app'

export default function LoginPage() {
  const router = useRouter()
  const { user, setUser, token, setToken } = useContext(UserContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('http://18.118.122.21:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const responseData = await response.json()
      //useEffect(() => {
        const user = responseData.user
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', responseData.token)

        setUser(user)
        setToken(responseData.token)
      //}, [])
      router.push('/')
    } else {
      alert('Email or password is invalid')
    }
  }

  return (
    <RootLayout>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </RootLayout>
  )
}