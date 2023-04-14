import { ReactElement } from "react";
import { Select } from "antd";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CalendarWeek from "../components/calendar-week/week";

function AdultChildLessons(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
  ];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main>
        <div className="pb-3 lg:pb-4 lg:mb-4 lg:flex lg:items-end lg:border-b lg:border-neutral-200">
          <h2 className="mb-4 lg:mb-0 heading-lg">Adult and Child Lessons</h2>
          <div className="flex items-center gap-2.5 ml-auto">
            <span className="hidden lg:block heading-sm">Filter</span>
            <Select
              allowClear={true}
              placeholder="Class"
              onChange={handleChange}
              className="w-full lg:w-44"
              options={[
                { value: "bubbletheseahorse", label: "Bubble the Seahorse" },
                { value: "cutietheclam", label: "Cutie the Clam" },
                { value: "danyythedolphin", label: "Danny the Dolphin (SEND)" },
                { value: "ollietheoctopus", label: "Ollie the Octopus" },
                { value: "smileytheturle", label: "Smiley the Turtle" },
                { value: "snappythecrab", label: "Snappy the Crab" },
                { value: "swishytheseal", label: "Swishy the Seal" },
                { value: "twinklethestarfish", label: "Twinkle The Starfish " },
              ]}
            />
          </div>
        </div>
        <CalendarWeek />
      </Main>
      <Footer />
    </>
  );
}

export default AdultChildLessons;
