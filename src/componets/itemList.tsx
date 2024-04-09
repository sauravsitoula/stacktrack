import { useContext } from 'react';
import { UserContext } from '@/pages/_app';
import { Grid } from '@mui/material';
import Item from '../componets/item'

export default function ItemList() {
    const { user, setUser, token, setToken } = useContext(UserContext);

    const userLevel = user?.isSuperAdmin ? 'super' : user?.isAdmin ? 'admin' : 'regular'
    const itemDataList = [
        {
            uuid: '1',
            name: 'Polo Tshirt',
            price: 11,
            description: 'white shirt of size S and M are available',
            image_url: 'https://mobile.yoox.com/images/items/10/10086461OR_14_f.jpg?impolicy=crop&width=387&height=490'
        },
        {
            uuid: '2',
            name: 'Polo Tshirt',
            price: 12,
            description: 'white shirt of size S and M are available',
            image_url: 'https://mobile.yoox.com/images/items/10/10086461OR_14_f.jpg?impolicy=crop&width=387&height=490'
        },
        {
            uuid: '3',
            name: 'Polo Tshirt',
            price: 13,
            description: 'white shirt of size S and M are available',
            image_url: 'https://mobile.yoox.com/images/items/10/10086461OR_14_f.jpg?impolicy=crop&width=387&height=490'
        },
        {
            uuid: '4',
            name: 'Polo Tshirt',
            price: 14,
            description: 'white shirt of size S and M are available',
            image_url: 'https://mobile.yoox.com/images/items/10/10086461OR_14_f.jpg?impolicy=crop&width=387&height=490'
        },
    ]

    return(
        <Grid container spacing={2}>
            {
                itemDataList.map(itemData => (
                    <Grid item xs={4}>
                        <Item
                            itemData={itemData}
                            userLevel = {userLevel}
                            context='list'
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}