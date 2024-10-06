import CardUserItem from "@/components/users/CardUserItem";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SearchInputButton from "@/components/global/SearchInputButton";
import TableWithActionFeature from "@/components/global/TableWithActionFeature";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SkeletonUserCard from "@/components/users/SkeletonUserCard";
import UserRolesEnum from "@/enums/UserRoleEnum";
import axiosClient from "@/services/axiosClient";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClassroomDto } from "@/components/classrooms/classrooms";
import { UserDto } from "@/components/users/users";

export default function PeopleEnrolledPage() {
  const { classroomCode } = useParams() as { classroomCode: string };
  const heightTable = "h-[48vh]";

  const [loading, setLoading] = useState<boolean>(false);
  const [classroom, setClassroom] = useState<ClassroomDto>({
    classPeriod: {
      id: "",
      classPeriodName: "",
      classPeriodCode: "",
      totalStudentsEnrolled: "",
    },
    teacher: null,
  });

  const [users, setUsers] = useState<UserDto[]>([]);
  const [virtualUsers, setVirtualUsers] = useState<UserDto[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const [responseData, setResponseData] = useState<any | null>(null);

  useEffect(() => {
    async function getClassroomDetail() {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/class-periods/${classroomCode}`
        );
        setClassroom(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch this class period detail");
      } finally {
        setLoading(false);
      }
    }
    getClassroomDetail();
  }, [classroomCode]);

  useEffect(() => {
    async function getEnrolledStudentsData() {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/class-periods/${classroomCode}/people`
        );
        setUsers(response.data.data.map((enrollment) => enrollment.user));
        setVirtualUsers(
          response.data.data.map((enrollment) => enrollment.user)
        );
      } catch (error) {
        toast.error("Failed to fetch data students");
      } finally {
        setLoading(false);
      }
    }

    getEnrolledStudentsData();
  }, [classroomCode]);

  const navigate = useNavigate();
  function handleNavigateToAddNewStudent() {
    navigate("/admin/class-periods/detail/people/new");
  }

  function handleSearchUser(value: string) {
    // setSelectedUser(null);
    // setIsUserSelected(false);
    setResetSelected(true);
    if (value === "") {
      setVirtualUsers(users);
      return;
    }

    const filteredData = virtualUsers.filter((virtualUser) =>
      virtualUser.fullName.toLowerCase().includes(value.toLowerCase())
    );

    setVirtualUsers(filteredData);
  }

  function generateSkeletonList() {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonUserCard key={index} />
        ))}
      </>
    );
  }

  const [resetSelected, setResetSelected] = useState(false);
  function handleSelectedUser(id: string) {
    // setIsUserSelected(true);
    console.log("selected user id add screen: ", id);
    // setFormData({
    //   ...formData,
    //   ["user_id"]: id,
    // });
    // console.log("users: ", users);
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle="List Siswa" />
      <div className="mx-4 mt-4 pb-12">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {classroom.classPeriod?.classPeriodName}
            </h1>
            <Badge variant="default">
              {classroom.classPeriod?.classPeriodCode}
            </Badge>
          </div>
        )}
      </div>
      <div className="bg-slate-200 h-full rounded-t-3xl">
        <div className="mx-4 pt-4">
          <div>
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
          </div>
          <div>
            <div className="mb-2">
              <SearchInputButton
                placeholderText="Search Student"
                handleSearch={handleSearchUser}
              />
              <Separator className="my-3" />
            </div>
            {loading ? (
              generateSkeletonList()
            ) : (
              <div className="bg-white rounded-lg">
                <TableWithActionFeature
                  dataTable={virtualUsers}
                  heightTable={heightTable}
                  handleSelectedItem={handleSelectedUser}
                  resetSelected={resetSelected}
                >
                  {/* <ButtonWithIcon size="icon" variant="ghost" type="button">
                    <CircleIcon className="h-4 w-4" />
                  </ButtonWithIcon> */}
                </TableWithActionFeature>
              </div>
            )}
          </div>
          <div className="mt-2 sticky bottom-4">
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
