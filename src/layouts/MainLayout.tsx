import { ReactNode } from "react";
import SearchAppBar from "../components/NavBar/NavBar";
import { Box, Container } from "@mui/material";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container maxWidth="xl">
        <SearchAppBar></SearchAppBar>
        <Box sx={{ marginTop: 10, p: 2 }}>
          {children}
        </Box>
      </Container>
    </>
  );
}

export default MainLayout;
