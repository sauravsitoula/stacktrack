import type { AppProps } from 'next/app'
import { createContext, useState, useEffect } from 'react'

export interface UserProps {
    uuid?: string;
    userName?: string;
    imageURL?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
    refreshToken?: string;
}

export interface ItemDataProps {
    uuid?: string;
    name?: string;
    price?: number;
    description?: string;
    quantity?: number;
    category_uuid?: string;
    image_url?: string;
    sku?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

interface UserContextParams {
    user: UserProps | null;
    token: string;
    [u: string]: any;
}

export interface CartProps {
    item_uuid: string;
    quantity: number;
}

interface CartContextParams {
    cart: CartProps[];
    [u: string]: any;
}

export const UserContext = createContext<UserContextParams>({user: null, token: ''})
export const CartContext = createContext<CartContextParams>({cart: []})

export default function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [cart, setCart] = useState<CartProps[]>([])

    useEffect(() => {
        let localUser = localStorage?.getItem('user')
        setUser(localUser ? JSON.parse(localUser) : null)
        setToken(localStorage.getItem('token') || '')

        let localCart = localStorage?.getItem('cart')
        setCart(localCart ? JSON.parse(localCart) : [])
    }, [])

    const userContextValue = {
        user,
        setUser,
        token,
        setToken
    }

    const cartContextValue = {
        cart,
        setCart
    }

    return (
        <UserContext.Provider value={userContextValue}>
            <CartContext.Provider value={cartContextValue}>
                <Component {...pageProps} />
            </CartContext.Provider>
        </UserContext.Provider>
    )
}