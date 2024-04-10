import { useContext } from "react";
import SearchItemList from "@/componets/searchItemList";
import { UserContext } from "../_app";
import { GetServerSideProps } from "next";
import RootLayout from "@/componets/layout";

interface SearchParams {
  searchTerms: string[];
}

export default function Search({ searchTerms }: SearchParams) {
  const { token } = useContext(UserContext);

  return (
    <RootLayout>
      {searchTerms[0] !== "" && token !== "" ? (
        <>
          <h1 style={{ textAlign: "center" }}>Search Results</h1>
          <SearchItemList searchTerm={searchTerms[0]} />
        </>
      ) : (
        <>null</>
      )}
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { searchTerm } = context.query;

  return {
    props: {
      searchTerms: searchTerm,
    },
  };
};
