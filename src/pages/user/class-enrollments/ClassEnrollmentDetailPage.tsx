import CardClassEnrollmentModule from "@/components/class-enrollment-modules/CardClassEnrollmentModule";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import CardStarterKitCourseModule from "@/components/course-modules/CardStarterKitCourseModule";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import CardUserItem from "@/components/users/CardUserItem";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { EditIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentDetailPage() {
  const pageTitle = "Detail Class Enrollment";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
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
      return currentUser?.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser?.id === classEnrollment?.user?.id;
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
  }, [classEnrollment, currentUser, navigate, studentClassEnrollments]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAssignNewTeacher = () => {
    navigate(`/class-enrollments/${id}/people/assign-teacher`);
    return;
  };

  const navigateToPeople = () => {
    navigate(`/class-enrollments/${id}/people`);
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle}>
        {loading ? (
          <BasicSkelenton />
        ) : (
          <ButtonWithIcon
            size="icon"
            variant="outline"
            className="bg-secondary"
            type="button"
            onClickAction={navigateToPeople}
          >
            <UsersIcon size={20} className="text-black" />
          </ButtonWithIcon>
        )}
      </HeaderPageWithBackButton>

      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {classEnrollment?.course.name} | {classEnrollment?.course.grade}
            </h1>
            <Badge variant="default">{classEnrollment?.id}</Badge>
            <br />
            <Badge variant="outline">{classEnrollment?.classroom.name}</Badge>
          </div>
        )}
      </div>
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <CardUserItem
            user={classEnrollment?.user}
            additionalClassName="-mt-8 bg-[#3C7A89] rounded-xl"
            textFullnameColor="text-secondary"
            defaultBadgeStyle="secondary"
          >
            {currentUser?.role === UserRolesEnum.ADMIN && (
              <ButtonWithIcon
                size="icon"
                variant="ghost"
                className="hover:bg-smagaLMS-green"
                onClickAction={() => navigateToAssignNewTeacher()}
              >
                <EditIcon size={20} className="text-white " />
              </ButtonWithIcon>
            )}
          </CardUserItem>
        )}
      </div>
      <div className="mx-4 mt-4">
        <p className="font-semibold text-sm my-2">Starter Kit Course Modules</p>
        {classEnrollment && (
          <Link
            to={`/class-enrollments/${id}/modules/starter-kit`}
            key={classEnrollment.course.id}
            className="block"
          >
            <CardStarterKitCourseModule data={classEnrollment.course} />
          </Link>
        )}
        <p className="font-semibold text-sm my-2">Class Enrollment Modules</p>
        {classEnrollment && (
          <Link
            to={`/class-enrollments/${id}/modules`}
            key={classEnrollment.id}
            className="block"
          >
            <CardClassEnrollmentModule data={classEnrollment} />
          </Link>
        )}
      </div>
    </>
  );
}
