import Image from 'next/image'
import { Box, Button, Card, Link, Typography } from '@mui/material';
import {ItemDataProps} from '../pages/_app'
import Placeholder from '../../public/placeholder.jpg'

interface ItemParams {
    itemData: ItemDataProps | null;
    userLevel: 'regular' | 'admin' | 'super';
    context: 'list' | 'single'
}

export default function Item({ itemData, userLevel, context }: ItemParams) {
    return (
        <Card raised sx={{padding: 2}}>
            <Box textAlign='center'>
                {
                    context === 'single'
                    ?
                    <Image
                        src={itemData?.image_url?.startsWith('http') ? itemData?.image_url : Placeholder}
                        alt={itemData?.name || ''}
                        width={200}
                        height={200}
                    />
                    :
                    <Link href={"/items/" + itemData?.uuid} >
                        <Image
                            src={itemData?.image_url?.startsWith('http') ? itemData?.image_url : Placeholder}
                            alt={itemData?.name || ''}
                            width={200}
                            height={200}
                        />
                    </Link>
                }
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                {itemData?.name}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
                Price: ${itemData?.price}
            </Typography>
            {
                context === 'single'
                ?
                <Typography sx={{ textAlign: 'center' }}>
                    Description: {itemData?.description}
                </Typography>
                :
                null
            }
            {
                context === 'list' || userLevel === 'regular'
                ?
                <Box textAlign='center'>
                    <Button color="inherit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Add to Cart</Button>
                </Box>
                :
                <Box textAlign='center'>
                    <Button color="inherit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>
                        <Link href={"/editItems/" + itemData?.uuid} style={{ textDecoration: 'none', color: 'white' }}>Edit</Link>
                    </Button>
                    <Button color="inherit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Delete</Button>
                </Box>
            }

        </Card>
    );
  }