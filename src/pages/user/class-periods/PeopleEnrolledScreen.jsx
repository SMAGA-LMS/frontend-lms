import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import TableWithActionFeature from "@/components/TableWithActionFeature";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/ui/BasicSkelenton";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SkeletonUserCard from "@/components/ui/SkeletonUserCard";
import UserRolesEnum from "@/enums/UserRoleEnum";
import axiosClient from "@/services/axiosClient";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function PeopleEnrolledScreen() {
  const { classPeriodCode } = useParams();
  const heightTable = "h-[48vh]";

  const [loading, setLoading] = useState(false);
  const [classPeriod, setClassPeriod] = useState({
    class_period: {},
    teacher: null,
  });

  useEffect(() => {
    async function getClassPeriodDetail() {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/class-periods/${classPeriodCode}`
        );
        setClassPeriod(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch this class period detail");
      } finally {
        setLoading(false);
      }
    }
    getClassPeriodDetail();
  }, [classPeriodCode]);

  useEffect(() => {
    async function getEnrolledStudentsData() {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/class-periods/${classPeriodCode}/people`
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
  }, [classPeriodCode]);

  const [users, setUsers] = useState([]);
  const [virtualUsers, setVirtualUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();
  function handleNavigateToAddNewStudent() {
    navigate("/admin/class-periods/detail/people/new");
  }

  function handleSearchUser(value) {
    // setSelectedUser(null);
    // setIsUserSelected(false);
    setResetSelected(true);
    if (value === "") {
      setVirtualUsers(users);
      return;
    }

    const filteredData = virtualUsers.filter((virtualUser) =>
      virtualUser.full_name.toLowerCase().includes(value.toLowerCase())
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
  function handleSelectedUser(id) {
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
              {classPeriod.class_period.name}
            </h1>
            <Badge variant="default">{classPeriod.class_period.code}</Badge>
          </div>
        )}
      </div>
      <div className="bg-slate-200 h-full rounded-t-3xl">
        <div className="mx-4 pt-4">
          <div>
            <Label variant="default" className="font-bold">
              Wali Kelas
            </Label>
            {loading ? (
              <BasicSkelenton />
            ) : (
              <CardUserItem
                user={classPeriod.teacher}
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
