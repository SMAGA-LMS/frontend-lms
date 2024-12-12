import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { UserDto } from "@/components/users/user";
import classroomService from "@/services/apis/classrooms/classroomService";
import ErrorPage from "@/pages/ErrorPage";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import TableScrollable from "@/components/global/TableScrollable";
import { ClassroomDto } from "@/components/classrooms/classroom";
import { Label } from "@/components/ui/label";
import studentEnrollmentService from "@/services/apis/student-enrollments/studentEnrollmentService";
import { StudentEnrollmentDto } from "@/components/student-enrollments/studentEnrollment";

export default function PeopleEnrolledClassroomPage() {
  const pageTitle = "List Siswa Kelas";
  const heightTable = "h-[60vh]";

  const navigate = useNavigate();

  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classroom, setClassroom] = useState<ClassroomDto>();
  const [studentEnrollments, setStudentEnrollments] = useState<
    StudentEnrollmentDto[]
  >([]);

  useEffect(() => {
    const getClassroomDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classroomService.getClassroomDetailByID(
        Number(id)
      );
      setLoading(false);

      if (response.success && response.data) {
        setClassroom(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getClassroomDetail();
  }, [id]);

  useEffect(() => {
    async function getPeopleEnrolledClassroom() {
      if (!classroom) {
        return;
      }

      setLoading(true);
      const response =
        await studentEnrollmentService.getPeopleEnrolledClassroom(classroom.id);
      setLoading(false);

      if (response.success && response.data) {
        setStudentEnrollments(response.data);
      } else {
        toast.error(response.message);
      }
    }
    getPeopleEnrolledClassroom();
  }, [classroom]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAddNewStudent = () => {
    navigate(`/classrooms/${id}/people/assign-student`);
  };

  // function handleSearchUser(value: string) {
  //   // setSelectedUser(null);
  //   // setIsUserSelected(false);
  //   setResetSelected(true);
  //   if (value === "") {
  //     setVirtualUsers(users);
  //     return;
  //   }

  //   const filteredData = virtualUsers.filter((virtualUser) =>
  //     virtualUser.fullName.toLowerCase().includes(value.toLowerCase())
  //   );

  //   setVirtualUsers(filteredData);
  // }

  // function generateSkeletonList() {
  //   return (
  //     <>
  //       {Array.from({ length: 5 }).map((_, index) => (
  //         <SkeletonUserCard key={index} />
  //       ))}
  //     </>
  //   );
  // }

  // const [resetSelected, setResetSelected] = useState(false);
  // function handleSelectedUser(id: string) {
  //   // setIsUserSelected(true);
  //   console.log("selected user id add screen: ", id);
  //   // setFormData({
  //   //   ...formData,
  //   //   ["user_id"]: id,
  //   // });
  //   // console.log("users: ", users);
  // }

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
                  {classroom?.name} | {classroom?.grade}
                </h1>
                <Badge variant="default">{classroom?.id}</Badge>
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
          <div className="bottom-0 left-0 w-full bg-white my-1 rounded-md">
            <Button
              variant="smagaLMSGreen"
              className="w-full"
              type="submit"
              onClick={navigateToAddNewStudent}
            >
              Tambah Siswa
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
