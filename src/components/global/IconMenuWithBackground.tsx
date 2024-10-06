import { ReactNode, useState } from "react";

const colors = {
  "smagaLMS-green": "bg-smagaLMS-green",
  "smagaLMS-gray": "bg-smagaLMS-gray",
};

interface IconMenuWithBackgroundProps {
  children?: ReactNode;
  color: keyof typeof colors;
}

export default function IconMenuWithBackground({
  children,
  color,
}: IconMenuWithBackgroundProps) {
  const [selectedColor] = useState<string>(colors[color]);

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
