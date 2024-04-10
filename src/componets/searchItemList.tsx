import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/pages/_app';
import { Grid } from '@mui/material';
import Item from './item'

interface SearchItemListParams {
    searchTerm: string;
}

export default function ItemList({searchTerm}: SearchItemListParams) {
    const { user, setUser, token, setToken } = useContext(UserContext);

    const userLevel = user?.isSuperAdmin ? 'super' : user?.isAdmin ? 'admin' : 'regular'
    const [itemDataList, setItemDataList] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://18.118.122.21:3000/api/items/search?name=' + searchTerm, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
            })

            if (response.ok) {
                const responseData = await response.json()
                setItemDataList(responseData.items)
            }
        };
        fetchData();
    }, [searchTerm, token])

    return(
        <Grid container spacing={2}>
            {
                itemDataList.map((itemData, index) => (
                    <Grid item xs={4} key={index}>
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