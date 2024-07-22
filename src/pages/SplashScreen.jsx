import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import thumbnailStudents from "../assets/images/thumbnail-students.svg";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [animationClass, setAnimationClass] = useState("animate-fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("animate-fadeOut");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div
        className={`bg-white flex items-center justify-center ${animationClass}`}
      >
        <ThumbnailWithFooter image={thumbnailStudents} footerText="Welcome!" />
      </div>
    </>
  );
}
