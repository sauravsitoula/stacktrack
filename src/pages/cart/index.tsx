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

    async function purchase() {
        const response = await fetch('http://18.118.122.21:3000/api/carts/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })

        if (response.ok) {
            setCart([])
            localStorage.setItem('cart', JSON.stringify([]))
            router.push('/')
        }
    }
    useEffect(() => {
        fetch('http://18.118.122.21:3000/api/carts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({'cartItems': cart})
        })
    }, [cart])

    return (
    <RootLayout>
        <Box
            display='flex'
            justifyContent='center'
        >
            {
                cart.length === 0
                ?
                <h1 style={{textAlign: 'center'}}>Your cart is empty.</h1>
                :
                <Stack width={'50%'} spacing={2} padding={2}>
                    <h1 style={{textAlign: 'center'}}>Cart</h1>
                    {
                        cart.map((cartItemData, index) => (
                                <CartItem
                                    cartItemData={cartItemData}
                                />
                            ))
                    }
                    <Button onClick={purchase} sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Purchase</Button>
                </Stack>
            }
        </Box>
    </RootLayout>
    )
}
