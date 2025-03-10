import { ClassEnrollmentModuleDto } from "@/components/class-enrollment-modules/classEnrollmentModule";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentModuleService from "@/services/apis/class-enrollment-modules/classEnrollmentModuleService";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { EyeIcon, PaperclipIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentModuleDetailPage() {
  const pageTitle = "Modul";
  const { id, classEnrollmentModuleID } = useParams<{
    id: string;
    classEnrollmentModuleID: string;
  }>();

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollmentModule, setClassEnrollmentModule] =
    useState<ClassEnrollmentModuleDto>();
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
    const getClassEnrollmentModuleDetail = async () => {
      setLoading(true);
      const response =
        await classEnrollmentModuleService.getClassEnrollmentModuleDetailByID(
          Number(classEnrollmentModuleID)
        );
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollmentModule(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getClassEnrollmentModuleDetail();
  }, [classEnrollmentModuleID]);

  useEffect(() => {
    if (!id || !classEnrollmentModule || !currentUser) {
      return;
    }

    const isMatchingClassEnrollment = () => {
      return classEnrollmentModule.classEnrollment?.id === Number(id);
    };

    // check if class enrollment id from params must be same with class enrollment id from class enrollment module
    if (!isMatchingClassEnrollment()) {
      setHasErrorPage(true);
      return;
    }

    const isUserAdmin = () => {
      return currentUser.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser.id === classEnrollmentModule.classEnrollment?.user?.id;
    };

    const isValidStudent = () => {
      return studentClassEnrollments.some(
        (enrollment) =>
          enrollment.id === classEnrollmentModule.classEnrollment.id
      );
    };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    if (!isUserAdmin() && !isValidTeacher() && !isValidStudent()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate(`/home`, { replace: true });
      return;
    }
  }, [
    classEnrollmentModule,
    currentUser,
    id,
    navigate,
    studentClassEnrollments,
  ]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const handleViewFile = () => {
    if (classEnrollmentModule?.module.file) {
      window.open(classEnrollmentModule?.module.file, "_blank");
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
            <h1 className="font-semibold">
              {classEnrollmentModule?.module?.name}
            </h1>
            <Separator className="my-3" />
            <Textarea
              value={classEnrollmentModule?.module?.description}
              disabled
              className="text-black bg-secondary"
              style={{ opacity: 1 }}
            />
            {classEnrollmentModule?.module?.file && (
              <div className="flex items-center justify-between space-x-2 mt-2">
                <PaperclipIcon size="24" />
                <span className="text-black flex-grow">
                  {getFileName(classEnrollmentModule?.module?.file)}
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
