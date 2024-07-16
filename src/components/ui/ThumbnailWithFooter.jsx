export default function ThumbnailWithFooter({ image, footerText }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen mx-4">
        <img
          className="w-auto h-auto -mb-6"
          loading="lazy"
          alt={footerText}
          src={image}
        />
        <div className="bg-smagaLMS-green text-white text-2xl p-3 font-sans font-bold w-full text-center rounded-xl shadow-xl">
          {footerText}
        </div>
      </div>
    </>
  );
}
