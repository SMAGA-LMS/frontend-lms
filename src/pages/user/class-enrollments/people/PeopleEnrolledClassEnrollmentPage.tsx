import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import TableScrollable from "@/components/global/TableScrollable";
import { StudentEnrollmentDto } from "@/components/student-enrollments/studentEnrollment";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { UserDto } from "@/components/users/user";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import studentEnrollmentService from "@/services/apis/student-enrollments/studentEnrollmentService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function PeopleEnrolledClassEnrollmentPage() {
  const pageTitle = "List Siswa Kelas";
  const heightTable = "h-[60vh]";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  // const { classroomCode } = useParams() as { classroomCode: string };
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [studentEnrollments, setStudentEnrollments] = useState<
    StudentEnrollmentDto[]
  >([]);
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
      return currentUser.id === classEnrollment?.user?.id;
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

    async function getPeopleEnrolledClassroom() {
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
    }
    getPeopleEnrolledClassroom();
  }, [classEnrollment, currentUser, navigate, studentClassEnrollments]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4 mt-4 pb-12">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold font-sans text-lg">
                  {classEnrollment?.course?.name} |{" "}
                  {classEnrollment?.classroom?.grade}
                </h1>
                <Badge variant="default">{classEnrollment?.id}</Badge>
                <br />
                <Badge variant="outline">
                  {classEnrollment?.classroom.name}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-slate-200 rounded-t-3xl pb-2">
        <div className="mx-4 pt-4">
          <div className="flex justify-between items-center">
            <Label className="font-bold">Tabel Siswa Kelas</Label>
            <div className="flex items-center gap-1 text-smaga text-sm">
              <div className="">Total: </div>
              <div className="font-extrabold">{studentEnrollments?.length}</div>
              <div className="font-extrabold">siswa</div>
            </div>
          </div>
          {/* <div>
              <Label className="font-bold">Wali Kelas</Label>
              {loading ? (
                <BasicSkelenton />
              ) : (
                <CardUserItem
                  user={classroom.teacher}
                  additionalClassName="bg-[#3C7A89] rounded-xl"
                  textFullnameColor="text-secondary"
                  defaultBadgeStyle="secondary"
                >
                  <ButtonWithIcon
                    size="icon"
                    variant="ghost"
                    className="hover:bg-smagaLMS-green"
                  />
                </CardUserItem>
              )}
            </div> */}
          <div>
            {/* <div className="mb-2">
                <SearchInputButton
                  placeholderText="Search Student"
                  handleSearch={handleSearchUser}
                />
                <Separator className="my-3" />
              </div> */}
            {loading ? (
              <div>
                <SkeletonGenerator />
              </div>
            ) : (
              <div className="bg-white rounded-lg">
                {/* <TableWithActionFeature
                    dataTable={virtualUsers}
                    heightTable={heightTable}
                    handleSelectedItem={handleSelectedUser}
                    resetSelected={resetSelected}
                  /> */}
                <TableScrollable
                  data={studentEnrollments.map((studentEnrollment) => {
                    const user: UserDto = {
                      id: studentEnrollment.user.id,
                      name: studentEnrollment.user.name,
                      username: studentEnrollment.user.username,
                      role: studentEnrollment.user.role,
                      avatar: studentEnrollment.user.avatar,
                      createdAt: studentEnrollment.user.createdAt,
                      updatedAt: studentEnrollment.user.updatedAt,
                    };
                    return user;
                  })}
                  heightTable={heightTable}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
