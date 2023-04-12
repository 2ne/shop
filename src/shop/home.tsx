import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";

function Home(): ReactElement {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main className="w-full p-3 mx-auto max-w-screen-2xl">HOME</main>
    </div>
  );
}

export default Home;
