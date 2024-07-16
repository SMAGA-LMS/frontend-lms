import { useState } from "react";

const colors = {
  "smagaLMS-green": "bg-smagaLMS-green",
  "smagaLMS-gray": "bg-smagaLMS-gray",
};

export default function IconMenuWithBackground({ children, color }) {
  const [selectedColor] = useState(colors[color]);

  return (
    <>
      <div
        className={`flex justify-center items-center w-[50px] h-[50px] ${selectedColor} rounded-[10px]`}
      >
        {children}
      </div>
    </>
  );
}
