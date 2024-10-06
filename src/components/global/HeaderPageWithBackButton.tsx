import { ArrowLeftIcon } from "lucide-react";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

interface HeaderPageWithBackButtonProps {
  pageTitle?: string;
  children?: ReactNode;
}

export default function HeaderPageWithBackButton({
  pageTitle,
  children,
}: HeaderPageWithBackButtonProps) {
  const navigate = useNavigate();

  function handleBackCLick(): void {
    if (window.history.length <= 2) {
      navigate("/");
    } else {
      navigate(-1);
    }
  }
  return (
    <>
      <div className="px-4 pt-4 sticky top-0 z-10 bg-white overflow-visible">
        <div className="flex">
          <div className="flex items-center">
            <ButtonWithIcon
              variant="outline"
              size="icon"
              className="rounded-full"
              onClickAction={handleBackCLick}
            >
              <ArrowLeftIcon size={24} />
            </ButtonWithIcon>
            <h1 className="font-extrabold font-sans text-black text-xl ml-4">
              {pageTitle}
            </h1>
          </div>
          <div className="ml-auto items-end">{children}</div>
        </div>
        <Separator className="my-3" />
      </div>
    </>
  );
}
