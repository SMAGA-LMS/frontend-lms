import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import { CourseModuleDto } from "@/components/course-modules/courseModule";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import CardModule from "@/components/modules/CardModule";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import courseModuleService from "@/services/apis/course-modules/courseModuleService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseModulesStarterKitPage() {
  const pageTitle = "List Modules";
  const heightTable = "h-[60vh]";

  const { id } = useParams<{ id: string }>();

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [courseModules, setCourseModules] = useState<CourseModuleDto[]>([]);
  const [studentClassEnrollments, setStudentClassEnrollments] = useState<
    ClassEnrollmentDto[]
  >([]);

  useEffect(() => {
    const getStudentClassEnrollmentsData = async () => {
      if (!currentUser || currentUser.role !== UserRolesEnum.STUDENT) {
        return;
      }

      setLoading(true);
      const response = await classEnrollmentService.getStudentClassEnrollments(
        currentUser.id
      );
      setLoading(false);

      if (response.success && response.data) {
        setStudentClassEnrollments(response.data);
      } else {
        toast.error(response.message);
      }
    };

    getStudentClassEnrollmentsData();
  }, [currentUser]);

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
    if (!classEnrollment || !currentUser) {
      return;
    }

    const isUserAdmin = () => {
      return currentUser.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser.id === classEnrollment.user?.id;
    };

    const isValidStudent = () => {
      return studentClassEnrollments.some(
        (enrollment) => enrollment.id === classEnrollment?.id
      );
    };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    // Check if the current user (teacher) is the teacher of this class enrollment
    // Check if the current user (student) is the student of this class enrollment
    if (!isUserAdmin() && !isValidTeacher() && !isValidStudent()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate("/home", { replace: true });
      return;
    }

    const getCourseModulesData = async () => {
      setLoading(true);
      const response = await courseModuleService.getCourseModules(
        classEnrollment.course.id
      );
      setLoading(false);

      if (response.success && response.data) {
        setCourseModules(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getCourseModulesData();
  }, [classEnrollment, currentUser, navigate, studentClassEnrollments]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

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
              {classEnrollment?.course?.name} | {classEnrollment?.course?.grade}
            </h1>
            <Badge variant="default">{classEnrollment?.course?.id}</Badge>
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
                  {courseModules.map((courseModule) => (
                    <Link
                      to={`/class-enrollments/${id}/modules/starter-kit/${courseModule.id}`}
                      key={courseModule.id}
                      className="block"
                    >
                      <CardModule
                        key={courseModule.id}
                        data={courseModule.module}
                      />
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </div>
    </>
  );
}
