import { AttendanceDto } from "@/components/attendances/attendance";
import CardUserAttendance from "@/components/attendances/CardUserAttendance";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { SessionRecordDto } from "@/components/session-records/sessionRecord";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStateContext } from "@/contexts/ContextProvider";
import AttendanceStatusEnum from "@/enums/AttendanceStatusEnum";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import attendanceService from "@/services/apis/attendances/attendanceService";
import sessionRecordService from "@/services/apis/session-records/sessionRecordService";
import { CalendarDaysIcon, UserCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function SessionRecordDetailPage() {
  const pageTitle = "Detail Session Record Attendance";

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const { id, sessionRecordID } = useParams<{
    id: string;
    sessionRecordID: string;
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [sessionRecord, setSessionRecord] = useState<SessionRecordDto>();
  const [attendances, setAttendances] = useState<AttendanceDto[]>([]);

  useEffect(() => {
    const getSessionRecordDetail = async () => {
      if (!sessionRecordID) {
        return;
      }

      setLoading(true);
      const response = await sessionRecordService.getSessionRecordByID(
        Number(sessionRecordID)
      );
      setLoading(false);

      if (response.success && response.data) {
        setSessionRecord(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getSessionRecordDetail();
  }, [sessionRecordID]);

  useEffect(() => {
    if (!currentUser || !sessionRecord) {
      return;
    }

    const isUserAdmin = () => {
      return currentUser?.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser?.id === sessionRecord?.classEnrollment?.user?.id;
    };

    const isMatchingClassEnrollment = () => {
      return Number(id) === sessionRecord?.classEnrollment.id;
    };

    // check if class enrollment id from url must be same with class enrollment id from session record
    if (!isMatchingClassEnrollment()) {
      setHasErrorPage(true);
      return;
    }

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    // Check if the current user (teacher) is the teacher of this class enrollment
    if (!isUserAdmin() && !isValidTeacher()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate("/home", { replace: true });
      return;
    }

    const getListOfStudentsAttendance = async () => {
      if (!sessionRecord?.id) {
        return;
      }

      setLoading(true);
      const response =
        await attendanceService.getListAttendancesBySessionRecordID(
          Number(sessionRecord.id)
        );
      setLoading(false);

      if (response.success && response.data) {
        setAttendances(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getListOfStudentsAttendance();
  }, [currentUser, id, navigate, sessionRecord]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const totalStudentPresent = attendances.filter(
    (attendance) => attendance.status === AttendanceStatusEnum.PRESENT
  ).length;

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mt-4 pb-8 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {sessionRecord?.classEnrollment.course.name} |{" "}
              {sessionRecord?.classEnrollment.course.grade}
            </h1>
            <Badge variant="default">
              {sessionRecord?.classEnrollment.classroom.name}
            </Badge>
          </div>
        )}
      </div>

      {!loading && sessionRecord && attendances && (
        <div className="mx-4 mt-4">
          <h1 className="font-bold text-md">{sessionRecord.title}</h1>
          <div className="flex items-center mt-2">
            <CalendarDaysIcon size={24} className="text-black mr-2" />
            <span>
              {new Date(sessionRecord.dateTime).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <UserCircle2Icon
                size={24}
                className="text-smagaLMS-russian-green mr-2"
              />
              <Badge variant="russian-green">
                {totalStudentPresent} Siswa Hadir
              </Badge>
            </div>
            <div className="flex items-center">
              <UserCircle2Icon size={24} className="text-destructive mr-2" />
              <Badge variant="destructive">
                {attendances.length - totalStudentPresent} Siswa Tidak Hadir
              </Badge>
            </div>
          </div>

          <div className="mt-2">
            <h1 className="font-bold font-sans text-md">Keterangan:</h1>
            <Textarea
              value={sessionRecord.description}
              disabled
              className="text-black bg-secondary mt-1"
              style={{ opacity: 1 }}
            />
          </div>
        </div>
      )}

      <div className="m-4">
        <Separator />
      </div>

      <div className="mx-4 pb-4">
        {!loading && attendances && (
          <div className="mt-4">
            <h1 className="font-bold text-sm">Siswa ({attendances.length})</h1>
            <div className="mt-4">
              {attendances.map((attendance, index) => (
                <div key={index} className="my-2">
                  <CardUserAttendance
                    user={attendance.student}
                    attendanceStatus={attendance.status}
                    incrementUserAttendance={index + 1}
                    disabled={true}
                    backgroundColor={index % 2 === 0 ? "bg-secondary" : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
