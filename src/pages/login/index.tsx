import { FormEvent, useContext } from 'react'
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

    const response = await fetch('http://3.138.201.84:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/')
    } else {
      console.log(response)
      setToken('Test')
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