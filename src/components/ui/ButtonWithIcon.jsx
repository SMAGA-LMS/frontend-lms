import { Button } from "./button";

export default function ButtonWithIcon({
  children,
  variant,
  size,
  className,
  onClickAction,
}) {
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
