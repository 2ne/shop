import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";

function BubbleTheSeahorse(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
    { label: "Bubble the Seahorse", link: "/BubbleTheSeahorse" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main>Product goes here</Main>
      <Footer />
    </>
  );
}

export default BubbleTheSeahorse;
