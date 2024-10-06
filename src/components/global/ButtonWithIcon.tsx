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
  onClickAction?: (event: any) => void;
}

export default function ButtonWithIcon({
  children,
  variant,
  size,
  className,
  onClickAction,
}: ButtonWithIconProps) {
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`${className}`}
        onClick={onClickAction}
      >
        {children}
      </Button>
    </>
  );
}
