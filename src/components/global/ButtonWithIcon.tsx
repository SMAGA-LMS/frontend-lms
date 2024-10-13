import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ButtonWithIconProps {
  children?: ReactNode;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "smagaLMSGreen"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClickAction?: (event: any) => void;
}

export default function ButtonWithIcon({
  children,
  variant,
  size,
  className,
  type,
  onClickAction,
}: ButtonWithIconProps) {
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`${className}`}
        type={type}
        onClick={onClickAction}
      >
        {children}
      </Button>
    </>
  );
}
