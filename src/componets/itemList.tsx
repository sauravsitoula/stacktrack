import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/pages/_app';
import { Grid } from '@mui/material';
import Item from '../componets/item'

interface ItemListParams {
    category: string;
}

export default function ItemList({category}: ItemListParams) {
    const { user, setUser, token, setToken } = useContext(UserContext);

    const userLevel = user?.isSuperAdmin ? 'super' : user?.isAdmin ? 'admin' : 'regular'
    const [itemDataList, setItemDataList] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            let url = 'http://18.118.122.21:3000/api/items'
            if(category !== '')
            {
                url = url + '?category=' + category
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })

            if (response.ok) {
                const responseData = await response.json()
                setItemDataList(responseData)
            }
        };
        fetchData();
    }, [category])

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