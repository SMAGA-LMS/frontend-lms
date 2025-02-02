import { CourseModuleDto } from "@/components/course-modules/courseModule";
import { CourseDto } from "@/components/courses/course";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import CardModule from "@/components/modules/CardModule";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import courseModuleService from "@/services/apis/course-modules/courseModuleService";
import courseService from "@/services/apis/courses/courseService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseModulesPage() {
  const pageTitle = "List Modules";
  const heightTable = "h-[60vh]";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [course, setCourse] = useState<CourseDto>();
  const [courseModules, setCourseModules] = useState<CourseModuleDto[]>([]);

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(Number(id));
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

    const isUserAdmin = () => {
      return currentUser?.role === UserRolesEnum.ADMIN;
    };

    const isValidPICCourse = () => {
      return currentUser.id === course.user?.id;
    };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    // Check if the current user (PIC Course) is the PIC Course of this course
    if (!isUserAdmin() && !isValidPICCourse()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate("/home", { replace: true });
      return;
    }

    const getCourseModulesData = async () => {
      setLoading(true);
      const response = await courseModuleService.getCourseModules(course.id);
      setLoading(false);

      if (response.success && response.data) {
        setCourseModules(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getCourseModulesData();
  }, [course, currentUser, navigate]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAddNewModule = () => {
    navigate(`/courses/${id}/modules/create`);
    return;
  };

  const isCourseModulesEmpty = courseModules.length === 0;

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
          </div>
        )}
      </div>
      <div className="mx-4">
        {loading ? (
          <div>
            <SkeletonGenerator />
          </div>
        ) : (
          <div>
            {/* <Separator className="my-3" /> */}
            <div className="my-3">
              <div>
                <Label className="font-semibold">
                  Total Module Starter: {courseModules.length}
                </Label>
              </div>
              <div>
                {isCourseModulesEmpty && (
                  <div className={`${heightTable}`}>
                    <Label className="text-sm text-gray-500">
                      Tidak ada module starter yang tersedia
                    </Label>
                  </div>
                )}
              </div>
            </div>
            {!isCourseModulesEmpty && (
              <ScrollArea
                className={`${heightTable} rounded-md overflow-y-auto`}
              >
                <div className="space-y-2">
                  {courseModules.map((courseModule, index) => (
                    <Link
                      to={`/courses/${id}/modules/${courseModule.id}`}
                      key={index}
                      className="block"
                    >
                      <CardModule key={index} data={courseModule.module} />
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
        <div className="bottom-16 left-0 w-full bg-white">
          <Button
            variant="smagaLMSGreen"
            className="w-full"
            type="submit"
            onClick={navigateToAddNewModule}
          >
            Tambah Modul
          </Button>
        </div>
      </div>
    </>
  );
}
