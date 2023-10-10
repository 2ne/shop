import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Checkbox,
  Collapse,
  Select,
  Slider,
  Tree,
  TreeSelect,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { treeData, treeSelectData } from "./calendar-data";
const { Panel } = Collapse;

function useViewportHeightPercentage(percentage: number) {
  const [height, setHeight] = useState(window.innerHeight * (percentage / 100));

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight * (percentage / 100));
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [percentage]);

  return height;
}

const formatter = (value?: number) => `${value ?? 0} years old`;
type SelectedValue = string | undefined;

export interface CalendarFiltersProps {
  singleProduct: boolean;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({ singleProduct }) => {
  const [currentAge, setCurrentAge] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CheckboxValueType[]>(
    []
  );
  const [currentLevel, setCurrentLevel] = useState<CheckboxValueType[]>([]);
  const [selectedClassValue, setSelectedClassValue] =
    useState<SelectedValue>(undefined);
  const [selectedTimeOfDayValue, setSelectedTimeOfDayValue] =
    useState<SelectedValue>(undefined);
  const [selectedLocationValue, setSelectedLocationValue] =
    useState<SelectedValue>(undefined);

  const safeHeight = useViewportHeightPercentage(75);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);

    // Handle 'age' parameter
    const ageValue = params.get("age");
    const updatedAge = ageValue ? parseInt(ageValue, 10) : null;
    setCurrentAge(updatedAge);

    // Handle 'location' parameter
    const locationValue = params.get("location");
    const updatedLocations = locationValue ? locationValue.split(",") : [];
    setCurrentLocation(updatedLocations);

    // Handle 'level' parameter
    const levelValue = params.get("level");
    const updatedLevels = levelValue ? levelValue.split(",") : [];
    setCurrentLevel(updatedLevels);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Update 'age' in URL
    if (currentAge !== null) {
      params.set("age", currentAge.toString());
    } else {
      params.delete("age");
    }

    // Update 'location' in URL
    if (currentLocation.length > 0) {
      params.set("location", currentLocation.join(","));
    } else {
      params.delete("location");
    }

    // Update 'level' in URL
    if (currentLevel.length > 0) {
      params.set("level", currentLevel.join(","));
    } else {
      params.delete("level");
    }

    // Update the URL without causing a page refresh
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, [currentAge, currentLocation, currentLevel]);

  const handleAgeSelectChange = (value: SelectedValue) => {
    const numValue = value ? parseInt(value, 10) : null;
    setCurrentAge(numValue);
  };

  const handleAgeInputChange = (value: number | null) => {
    setCurrentAge(value);
  };

  const handleLocationChange = (
    checkedValues: React.SetStateAction<CheckboxValueType[]>
  ) => {
    setCurrentLocation(checkedValues);
  };

  const handleLevelChange = (
    checkedValues: React.SetStateAction<CheckboxValueType[]>
  ) => {
    setCurrentLevel(checkedValues);
  };

  const addClassToHTML = () => {
    document.documentElement.classList.add("max-lg:overflow-hidden");
  };

  const removeClassFromHTML = () => {
    document.documentElement.classList.remove("max-lg:overflow-hidden");
  };

  const handleReset = () => {
    setSelectedClassValue(undefined);
    setSelectedTimeOfDayValue(undefined);
    setSelectedLocationValue(undefined);
    setCurrentAge(null);
  };

  const handleClassChange = (value: string) => {
    setSelectedClassValue(value);
  };

  const handleTimeOfDayChange = (value: string) => {
    setSelectedTimeOfDayValue(value);
  };

  return (
    <>
      {/* mobile filters */}
      <div className="max-lg:overflow-x-auto scrollbar-thin-x lg:hidden max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
        <div className="container flex lg:flex-wrap items-center gap-2 lg:gap-2.5 lg:p-0">
          {singleProduct ? (
            <Select
              listHeight={safeHeight}
              value={selectedClassValue}
              allowClear={true}
              placeholder="Class"
              onDropdownVisibleChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
              onChange={handleClassChange}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              options={[
                { value: "bubbletheseahorse", label: "Bubble the Seahorse" },
                { value: "carltheclownfish", label: "Carl the Clownfish" },
                {
                  value: "danyythedolphin",
                  label: "Danny the Dolphin (SEND)",
                },
                { value: "jellythejellyfish", label: "Jelly the Jellyfish" },
                { value: "smileytheturle", label: "Smiley the Turtle" },
                { value: "snappythecrab", label: "Snappy the Crab" },

                {
                  value: "twinklethestarfish",
                  label: "Twinkle The Starfish ",
                },
              ]}
            />
          ) : (
            <TreeSelect
              allowClear
              placeholder="Products"
              treeData={treeSelectData}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              listHeight={safeHeight}
              value={selectedClassValue}
              onChange={handleClassChange}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  addClassToHTML();
                } else {
                  removeClassFromHTML();
                }
              }}
            />
          )}
          <Select
            listHeight={safeHeight}
            allowClear={true}
            placeholder="Age"
            onDropdownVisibleChange={(open) => {
              if (open) {
                addClassToHTML();
              } else {
                removeClassFromHTML();
              }
            }}
            value={currentAge !== null ? currentAge.toString() : null}
            onChange={handleAgeSelectChange}
            className="ant-select-token"
            popupClassName="ant-select-mobile"
            options={[
              { value: "<1", label: "<1" },
              ...Array.from({ length: 18 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
              })),
              { value: ">18", label: ">18" },
            ]}
          />
          <Select
            listHeight={safeHeight}
            allowClear={true}
            placeholder="Location"
            onDropdownVisibleChange={(open) => {
              if (open) {
                addClassToHTML();
              } else {
                removeClassFromHTML();
              }
            }}
            value={currentLocation}
            onChange={handleLocationChange}
            className="ant-select-token"
            popupClassName="ant-select-mobile"
            options={[
              { value: "Little Thetford", label: "Little Thetford" },
              { value: "Newmarket", label: "Newmarket" },
            ]}
          />
          <Select
            listHeight={safeHeight}
            value={selectedTimeOfDayValue}
            allowClear={true}
            placeholder="Time of day"
            onDropdownVisibleChange={(open) => {
              if (open) {
                addClassToHTML();
              } else {
                removeClassFromHTML();
              }
            }}
            onChange={handleTimeOfDayChange}
            className="ant-select-token"
            popupClassName="ant-select-mobile"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Evening" },
            ]}
          />

          {(selectedClassValue ||
            selectedLocationValue ||
            selectedTimeOfDayValue ||
            currentAge) && (
            <Button
              type="link"
              onClick={handleReset}
              className="!bg-white !-ml-2 lg:hidden"
              title="Clear filters"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* desktop filters */}
      <div className="hidden lg:block -mt-1.5">
        <div className="sticky z-10 top-16">
          <Collapse
            defaultActiveKey={["1", "2", "3", "4"]}
            ghost
            bordered={false}
            className="select-none ant-collapse-calendar"
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <DownOutlined
                className="!text-neutral-500"
                rotate={isActive ? 180 : 0}
              />
            )}
          >
            {singleProduct ? (
              <Panel header="Class" key="1">
                <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox value="Smiley the Turtle">
                    <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded truncate">
                      Smiley the Turtle
                    </div>
                  </Checkbox>
                  <Checkbox value="Bubble the Seahorse">
                    <div className="bg-indigo-50 text-indigo-800 px-1.5 rounded truncate">
                      Bubble the Seahorse
                    </div>
                  </Checkbox>
                  <Checkbox value="Carl the Clownfish">
                    <div className="bg-orange-50 text-orange-800 px-1.5 rounded truncate">
                      Carl the Clownfish
                    </div>
                  </Checkbox>
                  <Checkbox value="Danny the Dolphin">
                    <div className="bg-sky-50 text-sky-800 px-1.5 rounded truncate">
                      Danny the Dolphin
                    </div>
                  </Checkbox>
                  <Checkbox value="Jelly the Jellyfish">
                    <div className="bg-violet-50 text-violet-800 px-1.5 rounded truncate">
                      Jelly the Jellyfish
                    </div>
                  </Checkbox>
                  <Checkbox value="Snappy the Crab">
                    <div className="bg-red-50 text-red-800 px-1.5 rounded truncate">
                      Snappy the Crab
                    </div>
                  </Checkbox>
                  <Checkbox value="Twinkle the Starfish">
                    <div className="bg-pink-50 text-pink-800 px-1.5 rounded truncate">
                      Twinkle the Starfish
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
            ) : (
              <Panel header="Classes" key="1">
                <Tree
                  checkable={true}
                  selectable={false}
                  treeData={treeData}
                  className="ant-tree-shop"
                />
              </Panel>
            )}
            <Panel
              header={
                <>
                  Age{" "}
                  {currentAge !== null && (
                    <span className="text-neutral-600">
                      · {currentAge} years old
                    </span>
                  )}
                </>
              }
              key="2"
            >
              <div className="-mt-2">
                <Slider
                  value={currentAge !== null ? currentAge : 0}
                  onChange={handleAgeInputChange}
                  min={0}
                  max={18}
                  className="flex-grow mr-2.5 [&_.ant-slider-rail]:bg-neutral-200"
                  tooltip={{ formatter }}
                />
              </div>
            </Panel>
            <Panel header="Location" key="3">
              <Checkbox.Group
                value={currentLocation}
                onChange={handleLocationChange}
                className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0"
              >
                <Checkbox value="Little Thetford">
                  <div className="truncate">Little Thetford</div>
                </Checkbox>
                <Checkbox value="Newmarket">
                  <div className="truncate">Newmarket</div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
            <Panel header="Level" key="4">
              <Checkbox.Group
                value={currentLevel}
                onChange={handleLevelChange}
                className="grid items-center grid-cols-4 gap-y-2"
              >
                {[
                  ...Array.from({ length: 8 }, (_, i) => ({
                    value: `${i + 1}`,
                    label: `${i + 1}`,
                  })),
                ].map(({ value, label }) => (
                  <Checkbox key={value} value={value}>
                    <div className="relative -ml-px text-xs -top-px">
                      <span>{label}</span>
                    </div>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
            <Panel header="Time of day" key="5">
              <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                <Checkbox value="Morning">
                  <div className="truncate">
                    <span>Morning</span>
                    <span className="text-neutral-500"> · 00:00 - 12:00</span>
                  </div>
                </Checkbox>
                <Checkbox value="Afternoon">
                  <div className="truncate">
                    <span>Afternoon</span>
                    <span className="text-neutral-500"> · 12:00 - 18:00</span>
                  </div>
                </Checkbox>
                <Checkbox value="Evening">
                  <div className="truncate">
                    <span>Evening</span>
                    <span className="text-neutral-500"> · 18:00 - 00:00</span>
                  </div>
                </Checkbox>
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default CalendarFilters;
