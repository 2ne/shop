import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Tiles from "../components/tile";
import Footer from "../components/footer";
import Main from "../components/main";

function Home(): ReactElement {
  const tileItems = [
    {
      label: "Adult and Child Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/6f2e0f06-8900-4dc0-981a-0259989f1871",
    },
    {
      label: "Independent Children's Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/788667ca-19eb-4818-88f2-8b895dadcdf2",
    },
    {
      label: "Adult Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/53602522-6ebd-4ce5-83a1-4ea35f8f1efe",
    },
    {
      label: "Private Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/58484fa4-ef77-43c0-9c6f-34d6a47be27f",
    },
    {
      label: "Adult and Child Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/da5cce7f-faba-46c0-b160-e0dad0d5fbb7",
    },
    {
      label: "Independent Children's Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/292eec5b-ab54-41be-83ce-e70f00257b41",
    },
    {
      label: "Adult Lessons",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/a3ec16f6-f8ff-40d9-8f47-3d15fa85d932",
    },
    {
      label: "Private Lessons",
      link: "/Home",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/540d3059-e4e3-4ef5-a516-c24f1bed3c50",
    },
    {
      label: "Crash Courses",
      link: "/AdultChildLessons",
      image:
        "https://app.joinin.online/services/anonymous/photo/file/06e8f09a-6232-4246-b75d-65739ccaade2",
    },
  ];

  return (
    <>
      <Header />
      <Breadcrumb />
      <Main>
        <Tiles items={tileItems} />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
