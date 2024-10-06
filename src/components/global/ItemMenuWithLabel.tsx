import { ReactNode } from "react";

interface ItemMenuWithLabelProps {
  children?: ReactNode;
  label?: string;
}

export default function ItemMenuWithLabel({
  children,
  label,
}: ItemMenuWithLabelProps) {
  return (
    <>
      <div className="flex w-[68px] h-auto">
        <div className="flex flex-col items-center justify-center">
          {children}
          <div className="flex w-[68px] mt-1 font-sans font-semibold text-black text-xs tracking-[0] leading-[14px] whitespace-normal break-words text-center justify-center">
            {label}
          </div>
        </div>
      </div>
    </>
  );
}
