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

export const UserContext = createContext<UserContextParams>({user: null, token: ''})

export default function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    useEffect(() => {
        let localUser = localStorage?.getItem('user')
        setUser(localUser ? JSON.parse(localUser) : null)

        setToken(localStorage.getItem('token') || '')
    }, [])



    const userContextValue = {
        user,
        setUser,
        token,
        setToken
    }

    return (
        <UserContext.Provider value={userContextValue}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}