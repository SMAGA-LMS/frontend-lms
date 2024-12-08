import CardUserAttendance, {
  StudentAttendance,
} from "@/components/attendances/CardUserAttendance";
import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { StudentEnrollmentDto } from "@/components/student-enrollments/studentEnrollment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import attendanceService from "@/services/apis/attendances/attendanceService";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import studentEnrollmentService from "@/services/apis/student-enrollments/studentEnrollmentService";
import { CalendarDaysIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export interface AddNewSessionRecordAttendancesPayload {
  classEnrollmentID: number;
  title: string;
  description: string;
  dateTime: string;
  students: studentAttendancePayload[];
}

interface studentAttendancePayload {
  studentID: number;
  status: string;
}

export default function AddNewSessionRecordAttendancesPage() {
  const pageTitle = "Tambah Session Record Attendance";

  const initialFormData: AddNewSessionRecordAttendancesPayload = {
    classEnrollmentID: 0,
    title: "",
    description: "",
    dateTime: "",
    students: [],
  };

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);
  const formDataRef =
    useRef<AddNewSessionRecordAttendancesPayload>(initialFormData);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [studentEnrollments, setStudentEnrollments] = useState<
    StudentEnrollmentDto[]
  >([]);

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
        formDataRef.current = {
          ...formDataRef.current,
          classEnrollmentID: response.data.id,
        };
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };

    getClassEnrollmentDetail();
  }, [id]);

  useEffect(() => {
    if (!currentUser || !classEnrollment) {
      return;
    }

    const isUserAdmin = () => {
      return currentUser?.role === UserRolesEnum.ADMIN;
    };

    const isValidTeacher = () => {
      return currentUser?.id === classEnrollment?.user?.id;
    };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    // Check if the current user (teacher) is the teacher of this class enrollment
    if (!isUserAdmin() && !isValidTeacher()) {
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate("/home", { replace: true });
      return;
    }

    const getPeopleEnrolledClassroom = async () => {
      if (!classEnrollment) {
        return;
      }

      setLoading(true);
      const response =
        await studentEnrollmentService.getPeopleEnrolledClassroom(
          classEnrollment.classroom.id
        );
      setLoading(false);

      if (response.success && response.data) {
        setStudentEnrollments(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getPeopleEnrolledClassroom();
  }, [classEnrollment, currentUser, navigate]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    formDataRef.current = {
      ...formDataRef.current,
      [name]: value,
    };
  };

  const handleStudentsAttendance = (studentAttendance: StudentAttendance) => {
    const updatedStudents = [...formDataRef.current.students];
    console.log("Updated students", updatedStudents);

    const index = updatedStudents.findIndex(
      (student) => student.studentID === studentAttendance.student.id
    );
    console.log("Index", index);

    if (index !== -1) {
      updatedStudents[index] = {
        studentID: studentAttendance.student.id,
        status: studentAttendance.attendanceStatus,
      };
    } else {
      updatedStudents.push({
        studentID: studentAttendance.student.id,
        status: studentAttendance.attendanceStatus,
      });
    }

    formDataRef.current = {
      ...formDataRef.current,
      students: updatedStudents,
    };
  };

  const getAttendanceStatus = (studentID: number) => {
    const student = formDataRef.current.students.find(
      (s) => s.studentID === studentID
    );
    return student ? student.status : undefined;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Form data", formDataRef);

    const payload: AddNewSessionRecordAttendancesPayload = {
      classEnrollmentID: formDataRef.current.classEnrollmentID,
      title: formDataRef.current.title,
      description: formDataRef.current.description,
      dateTime: formDataRef.current.dateTime,

      students: formDataRef.current.students,
    };

    console.log("Payload", payload);

    setLoading(true);
    const response = await attendanceService.AddNewSessionRecordAttendances(
      payload
    );
    setLoading(false);

    if (response.success && response.data) {
      setErrors(null);
      toast.success(response.message);
      navigate(
        `/class-enrollments/${id}/attendances/${response.data[0].sessionRecord.id}`,
        {
          replace: true,
        }
      );
      return;
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mt-4 pb-8 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {classEnrollment?.course.name} | {classEnrollment?.course.grade}
            </h1>
            <Badge variant="default">{classEnrollment?.classroom.name}</Badge>
          </div>
        )}
      </div>

      <div className="mx-4 mt-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div>
            <Label htmlFor="title" className="font-bold text-sm">
              Judul Sesi
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Masukkan judul session"
              className="w-full text-sm mt-1"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-2">
            <Label htmlFor="dateTime" className="font-bold text-sm">
              Jadwal Sesi
            </Label>
            <div className="flex items-center mt-1">
              <Label htmlFor="dateTime">
                <CalendarDaysIcon size={24} className="text-black mr-2" />
              </Label>
              <Input
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                placeholder="dd/mm/yyyy"
                className="w-auto text-sm"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-2">
            <Label htmlFor="description" className="font-bold text-sm">
              Keterangan
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Masukkan keterangan sesi"
              className="text-sm mt-1"
              required
              onChange={handleChange}
            />
          </div>

          {errors && <ErrorDisplay errors={errors} />}

          <div className="my-2">
            <Separator />
          </div>

          <div className="pb-16">
            {!loading && studentEnrollments && (
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-sm">
                    Siswa ({studentEnrollments.length})
                  </h1>
                </div>
                <div>
                  {studentEnrollments.map((studentEnrollment, index) => (
                    <div key={index} className="my-2">
                      <CardUserAttendance
                        handleSelectedStudentAttendance={
                          handleStudentsAttendance
                        }
                        user={studentEnrollment.user}
                        attendanceStatus={getAttendanceStatus(
                          studentEnrollment.user.id
                        )}
                        incrementUserAttendance={index + 1}
                        disabled={false}
                        backgroundColor={index % 2 === 0 ? "bg-secondary" : ""}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-4 left-4 right-4 flex justify-center">
            {loading ? (
              <ButtonLoading
                variant="smagaLMSGreen"
                size="lg"
                className="w-[calc(100%)] max-w-[22rem] rounded-lg"
              />
            ) : (
              <Button
                type="submit"
                variant="smagaLMSGreen"
                className="w-[calc(100%)] max-w-[22rem] rounded-lg"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
