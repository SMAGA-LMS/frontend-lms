export default function ItemMenuWithLabel({ children, label }) {
  return (
    <>
      <div className="flex w-[68px] h-auto">
        <div className="flex flex-col items-center justify-center">
          {children}
          <div className="flex w-[68px] font-sans font-normal text-black text-xs tracking-[0] leading-[14px] whitespace-normal break-words text-center justify-center">
            {label}
          </div>
        </div>
      </div>
    </>
  );
}
