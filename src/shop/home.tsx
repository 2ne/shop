import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Wrapper from "../components/wrapper";

function Home(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/Home" },
    { label: "Bubble the Seahorse", link: "/Home" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Wrapper>HOME</Wrapper>
    </>
  );
}

export default Home;
