import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";

function Home(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/Home" },
    { label: "Bubble the Seahorse", link: "/Home" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className="w-full p-3 mx-auto max-w-screen-2xl">HOME</main>
    </div>
  );
}

export default Home;
