import { ReactNode } from "react";
import { Toaster } from "sonner";

interface WithToasterProps {
  children?: ReactNode;
}

export default function WithToaster({ children }: WithToasterProps) {
  return (
    <>
      <div>
        {children}
        <Toaster position="bottom-center" richColors closeButton />
      </div>
    </>
  );
}
