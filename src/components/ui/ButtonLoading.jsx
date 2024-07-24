import { Loader2 } from "lucide-react";
import { Button } from "./button";

export function ButtonLoading({ variant }) {
  return (
    <Button disabled variant={variant} size="lg" className="w-full rounded-xl">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
