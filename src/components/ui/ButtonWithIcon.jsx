import { LogOut, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonWithIcon() {
  return (
    <Button size="sm">
      <LogOut className="mr-2 h-4 w-4" /> Logout
    </Button>
  );
}
