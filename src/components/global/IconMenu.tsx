interface IconMenuProps {
  icon: any;
}

export default function IconMenu({ icon }: IconMenuProps) {
  return (
    <>
      <img className="w-[24px] h-[24px]" src={icon} alt="" />
    </>
  );
}
