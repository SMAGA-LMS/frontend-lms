import { ReactNode } from "react";

interface InputWithLabelProps {
  children?: ReactNode;
  className?: string;
}

export default function InputWithLabel({
  children,
  className,
}: InputWithLabelProps) {
  return (
    <>
      <div className={`${className}`}>{children}</div>
    </>
  );
}
