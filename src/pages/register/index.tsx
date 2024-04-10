import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import RootLayout from '../../componets/layout'
import { Box, Button, Stack, TextField } from '@mui/material'

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

    const response = await fetch('http://18.118.122.21:3000/auth/register-user', {
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
  <RootLayout>
    <form onSubmit={handleSubmit}>
        <Box
          display='flex'
          justifyContent='center'
        >
          <Stack width={'50%'} spacing={2} padding={2}>
            <h1 style={{textAlign: 'center'}}>Register</h1>
            <TextField type="text" name="userName" label="User Name" required />
            <TextField type="url" name="imageURL" label="Image URL"/>
            <TextField type="email" name="email" label="Email" required />
            <TextField type="tel" name="phoneNumber" label="Phone Number"/>
            <TextField type="password" name="password" label="Password" required />
            <TextField type="text" name="address" label="Address" required />
            <Button type="submit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Register</Button>
          </Stack>
        </Box>
    </form>
  </RootLayout>
  )
}