import { Button } from "./button";

export default function ButtonWithIcon({ children, variant }) {
  return (
    <>
      <Button variant={variant} size="lg" className="w-full rounded-xl">
        {children}
        {/* <div className={`font-sans font-bold text-base mr-4 ${textColor}`}>
          {label}
        </div> */}
      </Button>
    </>
  );
}
