import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonLoadingProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "smagaLMSGreen"
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | undefined;
  className?: string;
}

export function ButtonLoading({
  variant,
  size,
  className,
}: ButtonLoadingProps) {
  return (
    <Button disabled variant={variant} size={size} className={`${className}`}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
