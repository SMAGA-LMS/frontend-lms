import { AttendanceDto } from "@/components/attendances/attendance";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import CardSessionItem from "@/components/session-records/CardSessionItem";
import CardSessionSummary from "@/components/session-records/CardSessionSummary";
import { SessionRecordDto } from "@/components/session-records/sessionRecord";
import { Badge } from "@/components/ui/badge";
import { useStateContext } from "@/contexts/ContextProvider";
import AttendanceStatusEnum from "@/enums/AttendanceStatusEnum";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import attendanceService from "@/services/apis/attendances/attendanceService";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import sessionRecordService from "@/services/apis/session-records/sessionRecordService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function SessionRecordsPage() {
  const pageTitle = "Session Records";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [sessionRecords, setSessionRecords] = useState<SessionRecordDto[]>([]);
  const [studentClassEnrollments, setStudentClassEnrollments] = useState<
    ClassEnrollmentDto[]
  >([]);
  const [attendances, setAttendances] = useState<AttendanceDto[]>([]);

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

    const getSessionRecordsData = async () => {
      if (!classEnrollment) {
        return;
      }

      setLoading(true);
      const response =
        await sessionRecordService.getListSessionRecordsByClassEnrollmentID(
          classEnrollment.id
        );
      setLoading(false);

      if (response.success && response.data) {
        setSessionRecords(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getSessionRecordsData();

    if (currentUser?.role === UserRolesEnum.STUDENT) {
      const getAttendancesData = async () => {
        if (!currentUser || !classEnrollment) {
          return;
        }

        setLoading(true);
        const response = await attendanceService.getAttendancesForStudent(
          currentUser.id,
          classEnrollment.id
        );
        setLoading(false);

        if (response.success && response.data) {
          setAttendances(response.data);
        } else {
          toast.error(response.message);
        }
      };

      getAttendancesData();
    }
  }, [classEnrollment, currentUser, navigate, studentClassEnrollments]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const totalStudentPresent = attendances.filter(
    (attendance) => attendance.status === AttendanceStatusEnum.PRESENT
  ).length;

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

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
          <div className="-mt-8 rounded-xl">
            {currentUser?.role !== UserRolesEnum.STUDENT ? (
              <CardSessionSummary totalDoneSession={sessionRecords.length} />
            ) : (
              <CardSessionSummary
                totalDoneSession={sessionRecords.length}
                totalPresent={totalStudentPresent}
              />
            )}
          </div>
        )}
      </div>

      <div className="mx-4 mt-8 pb-16">
        {currentUser?.role !== UserRolesEnum.STUDENT &&
          sessionRecords.map((sessionRecord) => (
            <div key={sessionRecord.id} className="mt-4">
              <CardSessionItem sessionRecord={sessionRecord} />
            </div>
          ))}
        {currentUser?.role === UserRolesEnum.STUDENT &&
          attendances.map((attendance) => (
            <div key={attendance.id} className="mt-4">
              <CardSessionItem
                sessionRecord={attendance.sessionRecord}
                attendanceStatus={attendance.status}
              />
            </div>
          ))}
      </div>
    </>
  );
}
