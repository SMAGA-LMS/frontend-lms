import { CourseDto } from "@/components/courses/courses";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import CardUserItem from "@/components/users/CardUserItem";
import courseService from "@/services/apis/courses/courseService";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseDetailPage() {
  const pageTitle = "Detail Mata Pelajaran";

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const [course, setCourse] = useState<CourseDto>();

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        toast.error("Invalid course ID");
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        toast.error(response.message);
      }
    };

    getCourseDetail();
  }, [id]);

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {course?.name} | {course?.grade}
            </h1>
            <Badge variant="default">{course?.id}</Badge>
          </div>
        )}
      </div>
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <CardUserItem
            user={course?.user}
            additionalClassName="-mt-8 bg-[#3C7A89] rounded-xl"
            textFullnameColor="text-secondary"
            defaultBadgeStyle="secondary"
          >
            <ButtonWithIcon
              size="icon"
              variant="ghost"
              className="hover:bg-smagaLMS-green"
              onClickAction={() => {
                toast.info("Fitur ini belum tersedia");
              }}
            >
              <EditIcon size={20} className="text-white " />
            </ButtonWithIcon>
          </CardUserItem>
        )}
      </div>
    </>
  );
}
