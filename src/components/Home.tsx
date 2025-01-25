import { Grid, GridItem } from "@chakra-ui/react";
import HeaderSection from "./HeaderSection.tsx/HeaderSection";
import SearchResults from "./MainSection/SearchResults";

const Home = () => {
  return (
    <Grid templateAreas={`"nav" "main"`}>
      <GridItem area="nav">
        <HeaderSection />
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        <SearchResults />
      </GridItem>
    </Grid>
  );
};

export default Home;
