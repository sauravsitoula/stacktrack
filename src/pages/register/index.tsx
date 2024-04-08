import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import CustomAppBar from '@/componets/customAppBar'

export default function RegisterPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const userName = formData.get('userName')
    const imageURL = formData.get('imageURL')
    const email = formData.get('email')
    const phoneNumber = formData.get('phoneNumber')
    const password = formData.get('password')
    const address = formData.get('address')

    const response = await fetch('https://3.138.201.84:3000/auth/register-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, imageURL, email, phoneNumber, password, address }),
    })

    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }

  return (
    <>
    <CustomAppBar/>
    <form onSubmit={handleSubmit}>
      <input type="userName" name="userName" placeholder="User Name" required />
      <input type="imageURL" name="imageURL" placeholder="Image URL"/>
      <input type="email" name="email" placeholder="Email" required />
      <input type="phoneNumber" name="phoneNumber" placeholder="Phone Number"/>
      <input type="password" name="password" placeholder="Password" required />
      <input type="address" name="address" placeholder="Address" required />
      <button type="submit">Register</button>
    </form>
  </>
  )
}