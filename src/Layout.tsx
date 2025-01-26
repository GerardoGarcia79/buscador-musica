import { Box, Grid, GridItem } from "@chakra-ui/react";
import HeaderSection from "./components/HeaderSection.tsx/HeaderSection";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid templateAreas={`"nav" "main"`} p={3}>
      <GridItem area="nav">
        <HeaderSection />
      </GridItem>
      <GridItem area="main">
        <Box>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
