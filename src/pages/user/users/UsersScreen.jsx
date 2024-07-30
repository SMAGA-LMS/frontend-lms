import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableWithSearchFeature from "@/components/TableWithSearchFeature";
import { Button } from "@/components/ui/button";
import SearchInputButton from "@/components/SearchInputButton";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axiosClient";
import { useEffect, useState } from "react";
import SkeletonUserCard from "@/components/ui/SkeletonUserCard";
import TableScrollable from "@/components/ui/TableScrollable";
import { toast } from "sonner";
import UserRolesEnum from "@/enums/UserRoleEnum";

export default function UserListScreen() {
  const pageTitle = "User List";
  const heightTable = "h-[48vh]";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [virtualUsers, setVirtualUsers] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getUsersData(UserRolesEnum.STUDENT);
  }, []);

  async function getUsersData(userRoleId) {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/users?role_id=${userRoleId.toString()}`
      );
      setUsers(response.data.data);
      setVirtualUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  // async function getTeachersData() {
  //   setLoading(true);
  //   try {
  //     const response = await axiosClient.get("/users/teachers");
  //     setUsers(response.data.data);
  //     setVirtualUsers(response.data.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch data");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function getAdminsData() {
  //   setLoading(true);
  //   try {
  //     const response = await axiosClient.get("/users/admins");
  //     setUsers(response.data.data);
  //     setVirtualUsers(response.data.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch data");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function generateSkeletonList() {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonUserCard key={index} />
        ))}
      </>
    );
  }

  function navigateToAddNewUser() {
    return () => {
      navigate("/admin/users/new");
    };
  }

  function handleSearchUser(value) {
    if (value === "") {
      setVirtualUsers(users);
      return;
    }

    const filteredData = virtualUsers.filter((virtualUser) =>
      virtualUser.full_name.toLowerCase().includes(value.toLowerCase())
    );

    setVirtualUsers(filteredData);
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="m-4 mb-20">
        <div className="">
          <Tabs defaultValue="student" className="">
            <div className=" ">
              <TabsList className="w-full">
                <TabsTrigger
                  value="student"
                  className="w-full"
                  onClick={() => getUsersData(UserRolesEnum.STUDENT)}
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="teacher"
                  className="w-full"
                  onClick={() => getUsersData(UserRolesEnum.TEACHER)}
                >
                  Teacher
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="w-full"
                  onClick={() => getUsersData(UserRolesEnum.ADMIN)}
                >
                  Admin
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mb-4">
              <SearchInputButton
                placeholderText="type user name or user code ..."
                handleSearch={handleSearchUser}
              />
            </div>
            <TabsContent value="student">
              {loading ? (
                <div>{generateSkeletonList()}</div>
              ) : (
                <TableScrollable
                  data={virtualUsers}
                  heightTable={heightTable}
                />
              )}
            </TabsContent>
            <TabsContent value="teacher">
              {loading ? (
                <div>{generateSkeletonList()}</div>
              ) : (
                <TableScrollable
                  data={virtualUsers}
                  heightTable={heightTable}
                />
              )}
            </TabsContent>
            <TabsContent value="admin">
              {loading ? (
                <div>{generateSkeletonList()}</div>
              ) : (
                <TableScrollable
                  data={virtualUsers}
                  heightTable={heightTable}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-4"
            onClick={navigateToAddNewUser()}
          >
            Add New User
          </Button>
        </div>
        <div></div>
      </div>
    </>
  );
}
