import { FormEvent, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import RootLayout from '../../componets/layout'
import { UserContext, CartContext } from '../_app'
import { Box, Button, Stack, TextField } from '@mui/material'
import CartItem from '@/componets/cartItem'

export default function Cart() {
  const router = useRouter()
  const { user, setUser, token, setToken } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

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
      const user = responseData.user
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', responseData.token)

      setUser(user)
      setToken(responseData.token)
      router.push('/')
    } else {
      alert('Email or password is invalid')
    }
  }

  return (
    <RootLayout>
      <Box
          display='flex'
          justifyContent='center'
        >
          <Stack width={'50%'} spacing={2} padding={2}>
            <h1 style={{textAlign: 'center'}}>Cart</h1>
            {
                cart.map((cartItemData, index) => (
                        <CartItem
                            cartItemData={cartItemData}
                        />
                    ))
            }
            <Button type="submit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Purchase</Button>
          </Stack>
        </Box>
    </RootLayout>
  )
}
