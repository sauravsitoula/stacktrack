import * as React from 'react';
import Image from 'next/image'
import testImg from '../polo.jpeg'
import { Box, Button, Card, Typography } from '@mui/material';

export default function ItemUser() {
    return (
        <Card sx={{ maxWidth: '30%' }}>
            <Box textAlign='center'>
                <Image
                    src={testImg}
                    alt='test'
                />
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                Polo Tshirt
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
                Price: $12
            </Typography>
            <Box textAlign='center'>
                <Button color="inherit" sx={{ backgroundColor: 'green' }}>Add to Cart</Button>
            </Box>
        </Card>
    );
  }