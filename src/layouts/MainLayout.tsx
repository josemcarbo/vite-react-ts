import { ReactNode } from "react";
import SearchAppBar from "../components/NavBar/NavBar";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <SearchAppBar />
      </header>
      <main>{children}</main>
      <footer>
      </footer>
    </>
  );
}

export default MainLayout;
