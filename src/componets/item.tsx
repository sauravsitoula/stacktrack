import Image from 'next/image'
import { Box, Button, Card, Link, Typography } from '@mui/material';
import {ItemDataProps, UserContext, CartContext} from '../pages/_app'
import Placeholder from '../../public/placeholder.jpg'
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface ItemParams {
    itemData: ItemDataProps | null;
    userLevel: 'regular' | 'admin' | 'super';
    context: 'list' | 'single'
}

export default function Item({ itemData, userLevel, context }: ItemParams) {
    const router = useRouter()
    const { user, setUser, token, setToken } = useContext(UserContext);
    const {cart, setCart } = useContext(CartContext)

    function addToCart() {
        const newCart =
        [
            {
                "item_uuid": itemData?.uuid || '',
                "quantity": 1
            },
            ...cart
        ]
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    async function deleteItem() {
        const response = await fetch('http://18.118.122.21:3000/api/items/' + itemData?.uuid, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })


        if (response.ok) {
            router.push('/')
        }
    }

    return (
        <Card raised sx={{padding: 2}}>
            <Box textAlign='center'>
                {
                    context === 'single'
                    ?
                    <Image
                        src={itemData?.image_url?.startsWith('http') ? itemData?.image_url : Placeholder}
                        alt={itemData?.name || ''}
                        width={200}
                        height={200}
                    />
                    :
                    <Link href={"/items/" + itemData?.uuid} >
                        <Image
                            src={itemData?.image_url?.startsWith('http') ? itemData?.image_url : Placeholder}
                            alt={itemData?.name || ''}
                            width={200}
                            height={200}
                        />
                    </Link>
                }
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                {itemData?.name}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
                Price: ${itemData?.price}
            </Typography>
            {
                context === 'single'
                ?
                <Typography sx={{ textAlign: 'center' }}>
                    Description: {itemData?.description}
                </Typography>
                :
                null
            }
            {
                context === 'list' || userLevel === 'regular'
                ?
                    itemData?.quantity || 0 > 0
                    ?
                    <Box textAlign='center'>
                        <Button color="inherit" onClick={addToCart} sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Add to Cart</Button>
                    </Box>
                    :
                    <Typography sx={{ color: 'red', textAlign: 'center', fontSize: '25px' }}>
                        Out of Stock
                    </Typography>
                :
                <Box textAlign='center'>
                    <Button color="inherit" sx={{ color: 'white', backgroundColor: '#ee6c4d', margin: 1 }}>
                        <Link href={"/editItems/" + itemData?.uuid} style={{ textDecoration: 'none', color: 'white' }}>Edit</Link>
                    </Button>
                    <Button color="inherit" onClick={deleteItem} sx={{ color: 'white', backgroundColor: '#ee6c4d', margin: 1 }}>Delete</Button>
                </Box>
            }

        </Card>
    );
  }