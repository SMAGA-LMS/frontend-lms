import LMSkuLogo from "@/assets/images/LMSku-logo-latest.png";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [animationClass, setAnimationClass] =
    useState<string>("animate-fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("animate-fadeOut");
    }, 1000); // 1000ms default

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`bg-white flex items-center justify-center ${animationClass}`}
    >
      <div className="w-full h-screen">
        <div className="flex flex-col items-center justify-center h-screen mx-4">
          <img src={LMSkuLogo} alt="LMSku Logo" className="w-auto h-48 mt-2" />
          <p className="text-lg font-semibold bg-smagaLMS-soft-white p-2 rounded-lg">
            Learning Management System
          </p>
        </div>
      </div>
    </div>
  );
}
