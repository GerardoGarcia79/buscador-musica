import { Grid, GridItem } from "@chakra-ui/react";
import HeaderSection from "./HeaderSection.tsx/HeaderSection";

const Home = () => {
  return (
    <Grid templateAreas={`"nav" "main"`}>
      <GridItem area="nav">
        <HeaderSection />
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
};

export default Home;
