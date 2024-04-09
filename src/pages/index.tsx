import { useContext } from 'react';
import { UserContext } from './_app';
import RootLayout from '../componets/layout';
import ItemList from '@/componets/itemList';

export default function Home() {
  const { user, setUser, token, setToken } = useContext(UserContext);

  return (
    <RootLayout>
      {
        user === null ?
        <>
          <h1 style={{textAlign: 'center'}}>Welcome!</h1>
          <h2 style={{textAlign: 'center'}}>Please Login or Register</h2>
        </>
        :
        <>
          <h1 style={{textAlign: 'center'}}>Welcome, {user.userName}!</h1>
          <ItemList/>
        </>
      }
    </RootLayout>
  );
}
