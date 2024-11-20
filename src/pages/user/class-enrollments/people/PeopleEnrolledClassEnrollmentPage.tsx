import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import TableScrollable from "@/components/global/TableScrollable";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { UserDto } from "@/components/users/users";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import studentEnrollmentService from "@/services/apis/student-enrollments/studentEnrollmentService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function PeopleEnrolledClassEnrollmentPage() {
  const pageTitle = "List Siswa Kelas";
  const heightTable = "h-[60vh]";

  // const { classroomCode } = useParams() as { classroomCode: string };
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();
  const [enrolledStudents, setEnrolledStudents] = useState<UserDto[]>([]);

  // const [classroom, setClassroom] = useState<ClassroomDto>({
  //   classPeriod: {
  //     id: "",
  //     classPeriodName: "",
  //     classPeriodCode: "",
  //     totalStudentsEnrolled: "",
  //   },
  //   teacher: null,
  // });

  // const [users, setUsers] = useState<UserDto[]>([]);
  // const [virtualUsers, setVirtualUsers] = useState<UserDto[]>([]);
  // const [errors, setErrors] = useState<string[]>([]);

  // const [responseData, setResponseData] = useState<any | null>(null);
  useEffect(() => {
    const getClassEnrollmentDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classEnrollmentService.getClassEnrollmentByID(id);
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
    const classroomID = classEnrollment?.classroom.id;
    async function getPeopleEnrolledClassroom() {
      if (!classroomID) {
        return;
      }

      setLoading(true);
      const response =
        await studentEnrollmentService.getPeopleEnrolledClassroom(classroomID);
      setLoading(false);

      if (response.success && response.data) {
        setEnrolledStudents(response.data);
      } else {
        toast.error(response.message);
      }
    }
    getPeopleEnrolledClassroom();
  }, [classEnrollment?.classroom.id]);

  // useEffect(() => {
  //   if (enrolledStudents) {
  //     const studentEnrollment = enrolledStudents.map((student) => {
  //       return student;
  //     });
  //   }
  // }, [stundentEnrollment]);

  // useEffect(() => {
  //   async function getEnrolledStudentsData() {
  //     setLoading(true);
  //     try {
  //       const response = await axiosClient.get(
  //         `/class-periods/${classroomCode}/people`
  //       );
  //       setUsers(response.data.data.map((enrollment) => enrollment.user));
  //       setVirtualUsers(
  //         response.data.data.map((enrollment) => enrollment.user)
  //       );
  //     } catch (error) {
  //       toast.error("Failed to fetch data students");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getEnrolledStudentsData();
  // }, [classroomCode]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

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
              <div className="font-extrabold">{enrolledStudents?.length}</div>
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
                  data={enrolledStudents}
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
