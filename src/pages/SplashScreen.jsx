import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import thumbnailStudents from "../assets/images/thumbnail-students.svg";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [animationClass, setAnimationClass] = useState("animate-fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("animate-fadeOut");
    }, 1000); // 1500ms default

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div
        className={`bg-white flex items-center justify-center ${animationClass}`}
      >
        <div className="w-full h-screen">
          <ThumbnailWithFooter
            image={thumbnailStudents}
            footerText="Welcome!"
            isHScreen="h-screen"
          />
        </div>
      </div>
    </>
  );
}
