import { Dispatch, SetStateAction, createContext, useState } from 'react'
import CustomAppBar from './customAppBar'

export default function RootLayout({children}: {children: React.ReactNode})
{
  const [user, setUser] = useState({})
  const [token, setToken] = useState('Pass')
  const userContextValue = {
    user,
    setUser,
    token,
    setToken
  }

  return (
      <div>
        <CustomAppBar/>
          {children}
      </div>
  )
}
