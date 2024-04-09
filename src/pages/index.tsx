import { useContext, useEffect } from 'react';
import { UserContext } from './_app';
import RootLayout from '../componets/layout';
import ItemList from '@/componets/itemList';
import { Box } from '@mui/material';

export default function Home() {
  const { user, setUser, token, setToken } = useContext(UserContext);

  let categories = [
    {
      'uuid': 'test1',
      'name': 'Shirts',
    },
    {
      'uuid': 'test2',
      'name': 'Jackets',
    },
    {
      'uuid': 'test3',
      'name': 'Hats',
    },
  ]

  useEffect(() => {
      async function fetchData() {
          const response = await fetch('http://18.118.122.21:3000/api/categories', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
          })

          if (response.ok) {
              const responseData = await response.json()
              categories = responseData
          }
      };
      fetchData();
  }, [token])

  return (
    <RootLayout>
      {
        user === null || token === '' ?
        <>
          <h1 style={{textAlign: 'center'}}>Welcome!</h1>
          <h2 style={{textAlign: 'center'}}>Please Login or Register</h2>
        </>
        :
        <>
          <h1 style={{textAlign: 'center'}}>Welcome, {user.userName}!</h1>
          <Box>

          </Box>
          <ItemList/>
        </>
      }
    </RootLayout>
  );
}
