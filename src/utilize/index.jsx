import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

// 幣值 & 數字轉換
export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));

  return dollarAmount;
};

// 動態生成多個選項
export const generateAmountOptions = (number) => {
  // return array of xxx
  return Array.from({ length: number }, (_, index) => {
    // each child in a list should have a unique key prop
    return (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    );
  });
};

// 不重複 array of objects 當中的屬性的內容
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === "colors") {
    // array.flat()
    // creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};

// time
export const formatTime = (time) => {
  return new Date(time).toLocaleString();
};
