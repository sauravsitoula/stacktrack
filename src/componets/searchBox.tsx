import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  async function search() {
    let searchTerm = searchText;

    if (searchText.startsWith("http")) {
      const response = await fetch("http://18.116.24.135:3003/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: searchText }),
      });

      if (response.ok) {
        const responseData = await response.json();
        searchTerm = responseData.label;
      }
    }

    router.push("/search/" + searchTerm);
  }

  return (
    <>
      <TextField
        type="search"
        label="Keyword or Image URL"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ width: "90%" }}
      />
      <Button
        color="inherit"
        onClick={search}
        sx={{ color: "white", backgroundColor: "#ee6c4d", margin: 1 }}
      >
        Search
      </Button>
    </>
  );
}
