import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Tiles from "../components/tile";
import Footer from "../components/footer";
import Main from "../components/main";

function Home(): ReactElement {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Main>
        <Tiles />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
