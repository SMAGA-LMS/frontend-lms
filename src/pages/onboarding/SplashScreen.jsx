import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import thumbnailStudents from "../../assets/images/thumbnail-students.svg";

export default function SplashScreen() {
  return (
    <>
      <div className="bg-white flex items-center justify-center">
        <ThumbnailWithFooter image={thumbnailStudents} footerText="Welcome!" />
      </div>
    </>
  );
}
