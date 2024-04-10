import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { ItemDataProps, UserContext } from "../_app";
import Item from "@/componets/item";
import RootLayout from "@/componets/layout";

interface ItemPageParams {
    uuids: string;
}

export default function ItemPage({uuids} : ItemPageParams) {
    const { user, setUser, token, setToken } = useContext(UserContext);

    const userLevel = user?.isSuperAdmin ? 'super' : user?.isAdmin ? 'admin' : 'admin'
    const [itemData, setItemData] = useState<ItemDataProps>({})

    useEffect(() => {
      async function fetchData() {
          const response = await fetch('http://18.118.122.21:3000/api/items/' + uuids[0], {
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

    return(
        <RootLayout>
            <Item
                itemData={itemData}
                userLevel = {userLevel}
                context='single'
            />
        </RootLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { uuid } = context.query;

    return {
        props: {
            uuids: uuid,
        },
    };
};