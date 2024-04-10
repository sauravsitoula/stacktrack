import Image from 'next/image'
import { Box, Button, Card, Link, TextField, Typography } from '@mui/material';
import {CartContext, CartProps, ItemDataProps, UserContext} from '../pages/_app'
import Placeholder from '../../public/placeholder.jpg'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import cart from '@/pages/cart';

interface CartItemParams {
    cartItemData: CartProps | null;
}

export default function CartItem({ cartItemData }: CartItemParams) {
    const router = useRouter()
    const { user, setUser, token, setToken } = useContext(UserContext);
    const {cart, setCart } = useContext(CartContext)
    const [itemData, setItemData] = useState<ItemDataProps>({})
    const [quantity, setQuantity] = useState(cartItemData?.quantity || 0)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://18.118.122.21:3000/api/items/' + cartItemData?.item_uuid, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
              },
            })

            if (response.ok) {
                const responseData = await response.json()
                setItemData(responseData)
            }
        };
        fetchData();
    }, [token])


    function updateQuantity(q: number) {
        const newCart = cart
        const itemIndex = newCart.findIndex((e) => (e.item_uuid === cartItemData?.item_uuid))
        newCart[itemIndex].quantity = q

        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    function deleteCartItem() {
        const newCart = cart.filter((e) => (e.item_uuid !== cartItemData?.item_uuid))
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    return (
        <Card raised sx={{padding: 2}}>
            <Box textAlign='center'>
                <Image
                    src={itemData?.image_url?.startsWith('http') ? itemData?.image_url : Placeholder}
                    alt={itemData?.name || ''}
                    width={200}
                    height={200}
                />
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                {itemData?.name}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
                Price: ${itemData?.price}
            </Typography>
            <Box textAlign='center'>
                <TextField
                    type="number"
                    name="quantity"
                    required
                    value={quantity}
                    onChange={(e) => {
                        setQuantity(parseInt(e.target.value))
                        updateQuantity(parseInt(e.target.value))
                        return
                    }}
                    InputProps={{
                        inputProps: {
                            max: itemData.quantity, min: 1
                        }
                    }}
                />
            </Box>
            <Box textAlign='center'>
                <Button color="inherit" onClick={deleteCartItem} sx={{ color: 'white', backgroundColor: 'black' }}>Remove</Button>
            </Box>
        </Card>
    );
  }