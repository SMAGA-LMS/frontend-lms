import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import { CourseModuleDto } from "@/components/course-modules/courseModule";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import courseModuleService from "@/services/apis/course-modules/courseModuleService";
import { EyeIcon, PaperclipIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseModuleStarterKitDetailPage() {
  const pageTitle = "Modul";
  const { id, courseModuleID } = useParams<{
    id: string;
    courseModuleID: string;
  }>();

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [courseModule, setCourseModule] = useState<CourseModuleDto>();
  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();

  useEffect(() => {
    const getCourseModuleDetail = async () => {
      if (!courseModuleID) {
        return;
      }

      setLoading(true);
      const response = await courseModuleService.getCourseModuleDetailByID(
        Number(courseModuleID)
      );
      setLoading(false);

      if (response.success && response.data) {
        setCourseModule(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getCourseModuleDetail();
  }, [courseModuleID]);

  useEffect(() => {
    const getClassEnrollmentDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classEnrollmentService.getClassEnrollmentByID(
        Number(id)
      );
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollment(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };

    getClassEnrollmentDetail();
  }, [id]);

  useEffect(() => {
    if (!id || !courseModule || !currentUser || !classEnrollment) {
      return;
    }

    const isMatchingCourse = () => {
      return courseModule.course?.id === classEnrollment.course.id;
    };

    // check if course id from class enrollment must be same with course id from course module
    if (!isMatchingCourse()) {
      setHasErrorPage(true);
      return;
    }

    const isUserAdmin = () => {
      return currentUser.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser.id === classEnrollment.user?.id;
    };

    // const isValidStudent = () => {
    //   return studentClassEnrollments.some(
    //     (enrollment) =>
    //       enrollment.id === classEnrollmentModule.classEnrollment.id
    //   );
    // };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    if (!isUserAdmin() && !isValidTeacher()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate(`/home`, { replace: true });
      return;
    }
  }, [classEnrollment, courseModule, currentUser, id, navigate]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const handleViewFile = () => {
    if (courseModule?.module?.file) {
      window.open(courseModule.module.file, "_blank");
    }
  };

  const getFileName = (filePath: string): string => {
    const fileName = filePath.split("/").pop() || "";
    return fileName.length > 25 ? `${fileName.substring(0, 25)}...` : fileName;
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <SkeletonGenerator />
        ) : (
          <div>
            <h1 className="font-semibold">{courseModule?.module?.name}</h1>
            <Separator className="my-3" />
            <Textarea
              value={courseModule?.module?.description}
              disabled
              className="text-black bg-secondary"
              style={{ opacity: 1 }}
            />
            {courseModule?.module?.file && (
              <div className="flex items-center justify-between space-x-2 mt-2">
                <PaperclipIcon size="24" />
                <span className="text-black flex-grow">
                  {getFileName(courseModule?.module?.file)}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="p-2"
                  onClick={handleViewFile}
                >
                  <EyeIcon size="24" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
