import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { UserDto } from "@/components/users/users";
import classroomService from "@/services/apis/classrooms/classroomService";
import ErrorPage from "@/pages/ErrorPage";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import TableScrollable from "@/components/global/TableScrollable";
import { StudentEnrollmentDto } from "@/components/student-enrollments/studentEnrollment";
import { ClassroomDto } from "@/components/classrooms/classrooms";

export default function PeopleEnrolledClassroomPage() {
  const pageTitle = "List Siswa Kelas";
  const heightTable = "h-[48vh]";

  // const { classroomCode } = useParams() as { classroomCode: string };
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classroom, setClassroom] = useState<ClassroomDto>();
  const [stundentEnrollment, setStundentEnrollment] =
    useState<StudentEnrollmentDto[]>();

  // const [classroom, setClassroom] = useState<ClassroomDto>({
  //   classPeriod: {
  //     id: "",
  //     classPeriodName: "",
  //     classPeriodCode: "",
  //     totalStudentsEnrolled: "",
  //   },
  //   teacher: null,
  // });

  const [users, setUsers] = useState<UserDto[]>([]);
  // const [virtualUsers, setVirtualUsers] = useState<UserDto[]>([]);
  // const [errors, setErrors] = useState<string[]>([]);

  // const [responseData, setResponseData] = useState<any | null>(null);
  useEffect(() => {
    const getClassroomDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classroomService.getClassroomDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setClassroom(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getClassroomDetail();

    async function getPeopleEnrolledClassroom() {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classroomService.getPeopleEnrolledClassroom(id);
      setLoading(false);

      if (response.success && response.data) {
        setStundentEnrollment(response.data);
      } else {
        toast.error(response.message);
      }
    }
    getPeopleEnrolledClassroom();
  }, [id]);

  useEffect(() => {
    if (stundentEnrollment) {
      const studentEnrollment = stundentEnrollment.map((enrollment) => {
        return enrollment.user;
      });

      setUsers(studentEnrollment);
    }
  }, [stundentEnrollment]);

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

  // function handleNavigateToAddNewStudent() {
  //   navigate("/admin/class-periods/detail/people/new");
  // }

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
            <h1 className="font-bold font-sans text-lg">
              {classroom?.name} | {classroom?.grade}
            </h1>
            <Badge variant="default">{classroom?.id}</Badge>
          </div>
        )}
      </div>
      <div className="bg-slate-200 rounded-t-3xl pb-2">
        <div className="mx-4 pt-4">
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
                <TableScrollable data={users} heightTable={heightTable} />
              </div>
            )}
          </div>
          <div className="bottom-16 left-0 w-full bg-white my-1 rounded-md">
            <Button
              variant="smagaLMSGreen"
              className="w-full"
              type="submit"
              onClick={() => toast.info("Fitur ini belum tersedia")}
            >
              Tambah Siswa
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
