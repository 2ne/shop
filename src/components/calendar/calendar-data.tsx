const adultAndChildLessons = [
  "Smiley the Turtle",
  "Bubble the Seahorse",
  "Carl the Clownfish",
  "Danny the Dolphin",
  "Jelly the Jellyfish",
  "Snappy the Crab",
  "Twinkle the Starfish",
];

const independentChildrensLessons = [
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Stage 4",
  "Stage 5",
];

const adultLessons = ["Beginner", "Intermediate", "Advanced"];

const privateLessons = ["Children's Class", "Adult's Class"];

export const treeData = [
  {
    title: (
      <div className="bg-emerald-50 text-emerald-800 px-2 rounded -ml-1 line-clamp-2 leading-[1.275] py-1">
        Adult and Child Lessons
      </div>
    ),
    key: "adultChild",
    children: adultAndChildLessons.map((product, index) => ({
      title: product,
      key: `adultChild-${index}`,
    })),
  },
  {
    title: (
      <div className="bg-blue-50 text-blue-800 px-2 rounded -ml-1 line-clamp-2 leading-[1.275] py-1">
        Independent Children's Lessons
      </div>
    ),
    key: "independantChild",
    children: independentChildrensLessons.map((product, index) => ({
      title: product,
      key: `independantChild-${index}`,
    })),
  },
  {
    title: (
      <div className="bg-amber-50 text-amber-800 px-1.5 rounded -ml-1 truncate">
        Adult Lessons
      </div>
    ),
    key: "adult",
    children: adultLessons.map((product, index) => ({
      title: product,
      key: `adult-${index}`,
    })),
  },
  {
    title: (
      <div className="bg-rose-50 text-rose-800 px-1.5 rounded -ml-1 truncate">
        Private Lessons
      </div>
    ),
    key: "private",
    children: privateLessons.map((product, index) => ({
      title: product,
      key: `private-${index}`,
    })),
  },
];

export const treeSelectData = [
  {
    value: "Adult and Child Lessons",
    title: (
      <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded -ml-1 truncate">
        Adult and Child Lessons
      </div>
    ),
    children: adultAndChildLessons.map((product, index) => ({
      value: `adultChild-${index}`,
      title: product,
    })),
  },
  {
    value: "Independent Children's Lessons",
    title: (
      <div className="bg-blue-50 text-blue-800 px-1.5 rounded -ml-1 truncate">
        Independent Children's Lessons
      </div>
    ),
    children: independentChildrensLessons.map((product, index) => ({
      value: `independantChild-${index}`,
      title: product,
    })),
  },
  {
    value: "Adult Lessons",
    title: (
      <div className="bg-amber-50 text-amber-800 px-1.5 rounded -ml-1 truncate">
        Adult Lessons
      </div>
    ),
    children: adultLessons.map((product, index) => ({
      value: `adult-${index}`,
      title: product,
    })),
  },
  {
    value: "Private Lessons",
    title: (
      <div className="bg-rose-50 text-rose-800 px-1.5 rounded -ml-1 truncate">
        Private Lessons
      </div>
    ),
    children: privateLessons.map((product, index) => ({
      value: `private-${index}`,
      title: product,
    })),
  },
];
