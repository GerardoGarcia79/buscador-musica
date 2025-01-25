import { Grid, GridItem } from "@chakra-ui/react";
import HeaderSection from "./HeaderSection.tsx/HeaderSection";
import SearchResults from "./MainSection/SearchResults";

const Home = () => {
  return (
    <Grid templateAreas={`"nav" "main"`} p={3}>
      <GridItem area="nav">
        <HeaderSection />
      </GridItem>
      <GridItem area="main">
        <SearchResults />
      </GridItem>
    </Grid>
  );
};

export default Home;
