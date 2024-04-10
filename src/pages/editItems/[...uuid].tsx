import { FormEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RootLayout from '../../componets/layout'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import { ItemDataProps } from '../_app';
import { GetServerSideProps } from 'next';
import { UserContext } from '../_app';

interface EditItemParams {
    uuids: string[];
}

export default function EditItem({uuids} : EditItemParams) {
  const router = useRouter()
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [itemData, setItemData] = useState<ItemDataProps>({})
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [image_url, setImage_url] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

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
            setName(responseData.name)
            setDescription(responseData.description)
            setPrice(responseData.price)
            setQuantity(responseData.quantity)
            setSelectedCategory(responseData.category_uuid)
            setImage_url(responseData.image_url)
        }

        const responseCat = await fetch('http://18.118.122.21:3000/api/categories', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
          })

          if (responseCat.ok) {
              const responseData = await responseCat.json()
              setCategories([{'uuid': '', 'name': 'Category'}, ...responseData])
          }
    };
    fetchData();
  }, [token])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('http://18.118.122.21:3000/api/items/' + itemData?.uuid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ name, description, price, quantity, selectedCategory, image_url }),
    })

    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }

  return (
  <RootLayout>
    <form onSubmit={handleSubmit}>
        <Box
          display='flex'
          justifyContent='center'
        >
          <Stack width={'50%'} spacing={2} padding={2}>
            <h1 style={{textAlign: 'center'}}>Edit Item</h1>
            <TextField
              type="text"
              name="name"
              label="Name"
              required
              value={name}
              onChange={(e) => (setName(e.target.value))}
            />
            <TextField
              type="text"
              name="description"
              label="Description"
              required
              value={description}
              onChange={(e) => (setDescription(e.target.value))}
            />
            <TextField
                type="number"
                name="price"
                label="Price"
                required
                value={price}
                onChange={(e) => (setPrice(parseInt(e.target.value)))}
                InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            />
            <TextField
              type="number"
              name="quantity"
              label="Quantity"
              required
              value={quantity}
              onChange={(e) => (setQuantity(parseInt(e.target.value)))}
            />
            <FormControl fullWidth>
              <InputLabel id="Category-Select">Category</InputLabel>
              <Select
                labelId="Category-Select"
                onChange={handleChange}
                value={selectedCategory}
                required
              >
                {categories.map((cat, index) => (
                      <MenuItem value={cat.uuid} key={index}> {cat.name} </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              type="url"
              name="image_url"
              label="Image URL"
              required
              value={image_url}
              onChange={(e) => (setImage_url(e.target.value))}
            />
            <Button type="submit" sx={{ color: 'white', backgroundColor: '#ee6c4d' }}>Update</Button>
          </Stack>
        </Box>
    </form>
  </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query;

  return {
      props: {
          uuids: uuid
      },
  };
};