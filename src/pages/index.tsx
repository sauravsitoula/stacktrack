import { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import RootLayout from "../componets/layout";
import ItemList from "@/componets/itemList";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  Link,
} from "@mui/material";
import SearchBox from "@/componets/searchBox";

export default function Home() {
  const { user, token } = useContext(UserContext);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://18.118.122.21:3000/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setCategories([{ uuid: "", name: "Category" }, ...responseData]);
      }
    }
    fetchData();
  }, [token]);

  return (
    <RootLayout>
      {user === null || token === "" ? (
        <>
          <h1 style={{ textAlign: "center" }}>Welcome!</h1>
          <h2 style={{ textAlign: "center" }}>Please Login or Register</h2>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Welcome, {user.userName}!</h1>
          <Grid container spacing={2} margin={2}>
            <Grid item xs={1} />
            <Grid item xs={1}>
              <Button
                color="inherit"
                sx={{ color: "white", backgroundColor: "#ee6c4d" }}
              >
                <Link
                  href={"/addItem/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Add Item
                </Link>
              </Button>
            </Grid>
            <Grid item xs={8}>
              <SearchBox />
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel id="Category-Select">Category</InputLabel>
                <Select
                  labelId="Category-Select"
                  onChange={handleChange}
                  value={selectedCategory}
                >
                  {categories.map((cat, index) => (
                    <MenuItem value={cat.uuid} key={index}>
                      {" "}
                      {cat.name}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <ItemList category={selectedCategory} />
        </>
      )}
    </RootLayout>
  );
}
