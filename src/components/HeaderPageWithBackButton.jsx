import { ArrowLeftIcon } from "lucide-react";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function HeaderPageWithBackButton({ pageTitle, children }) {
  const navigate = useNavigate();

  function handleBackCLick() {
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
              type="button"
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
