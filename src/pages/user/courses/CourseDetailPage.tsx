import { CourseDto } from "@/components/courses/courses";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import CardStarterKitModule from "@/components/course-modules/CardStarterKitCourseModule";
import { Badge } from "@/components/ui/badge";
import CardUserItem from "@/components/users/CardUserItem";
import ErrorPage from "@/pages/ErrorPage";
import courseService from "@/services/apis/courses/courseService";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";

export default function CourseDetailPage() {
  const pageTitle = "Detail Mata Pelajaran";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [course, setCourse] = useState<CourseDto>();

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getCourseDetail();
  }, [id]);

  useEffect(() => {
    if (!course || !currentUser) {
      return;
    }

    if (
      currentUser?.id !== course?.user?.id &&
      currentUser?.role !== UserRolesEnum.ADMIN
    ) {
      setHasErrorPage(true);
    }
  }, [course, currentUser]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAssignNewTeacher = () => {
    console.log(`/courses/${id}/assign-teacher`);
    navigate(`/courses/${id}/assign-teacher`);
    return;
  };

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
          <div>
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
                onClickAction={() => navigateToAssignNewTeacher()}
              >
                <EditIcon size={20} className="text-white " />
              </ButtonWithIcon>
            </CardUserItem>
          </div>
        )}
        <div className="mt-4">
          <p className="font-semibold text-sm my-2">Starter Kit Modules</p>
          {course && (
            <Link to={`/courses/${id}/modules`} key={id} className="block">
              <CardStarterKitModule data={course} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
