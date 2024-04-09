import { GetServerSideProps } from "next";
import { useContext } from "react";
import { UserContext } from "../_app";
import Item from "@/componets/item";
import RootLayout from "@/componets/layout";

interface ItemPageParams {
    uuid: string;
}

export default function ItemPage({uuid} : ItemPageParams) {
    const { user, setUser, token, setToken } = useContext(UserContext);

    const userLevel = user?.isSuperAdmin ? 'super' : user?.isAdmin ? 'admin' : 'admin'
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

    const itemData = itemDataList.find((e) => e.uuid === uuid[0]) || null;

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
            uuid: uuid,
        },
    };
};