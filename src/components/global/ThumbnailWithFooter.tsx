interface ThumbnailWithFooterProps {
  image: string;
  footerText: string;
  isHScreen?: string;
  sizeText: string;
}

function ThumbnailWithFooter({
  image,
  footerText,
  isHScreen,
  sizeText,
}: ThumbnailWithFooterProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${isHScreen} mx-4`}
    >
      <img
        className="w-auto h-auto -mb-6"
        loading="lazy"
        alt={footerText}
        src={image}
      />
      <div
        className={`bg-smagaLMS-green text-white ${sizeText} p-4 font-sans font-bold w-full text-center rounded-3xl shadow-xl -mb-5`}
      >
        {footerText}
      </div>
    </div>
  );
}

export default ThumbnailWithFooter;
