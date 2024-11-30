import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableScrollable from "@/components/global/TableScrollable";
import { toast } from "sonner";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { UserDto } from "@/components/users/user";
import userService from "@/services/apis/users/userService";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";

export default function UsersPage() {
  const pageTitle = "User List";
  const heightTable = "h-[64vh]";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserDto[]>([]);
  // const [virtualUsers, setVirtualUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    getUsersData(UserRolesEnum.STUDENT);
  }, []);

  const getUsersData = async (role: string) => {
    setLoading(true);
    const response = await userService.getUsers(role);
    setLoading(false);

    if (response.success && response.data) {
      setUsers(response.data);
      // setVirtualUsers(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const navigateToAddNewUser = () => {
    console.log("navigateToAddNewUser");
    navigate("/users/create");
    return;
  };

  const renderTabsContent = (role: UserRolesEnum) => (
    <TabsContent value={role.toLowerCase()}>
      {loading ? (
        <div>
          <SkeletonGenerator />
        </div>
      ) : (
        <TableScrollable data={users} heightTable={heightTable} />
      )}
    </TabsContent>
  );

  // function handleSearchUser(value: string) {
  //   if (value === "") {
  //     setVirtualUsers(users);
  //     return;
  //   }

  //   const filteredData = virtualUsers.filter((virtualUser) =>
  //     virtualUser.fullName.toLowerCase().includes(value.toLowerCase())
  //   );

  //   setVirtualUsers(filteredData);
  // }

  // return (
  //   <>
  //     <HeaderPageWithBackButton pageTitle={pageTitle} />

  //     <div className="m-4 mb-20">
  //       <div className="">
  //         <Tabs defaultValue="student" className="">
  //           <div className=" ">
  //             <TabsList className="w-full">
  //               <TabsTrigger
  //                 value="student"
  //                 className="w-full"
  //                 onClick={() => getUsersData(UserRolesEnum.STUDENT)}
  //               >
  //                 Student
  //               </TabsTrigger>
  //               <TabsTrigger
  //                 value="teacher"
  //                 className="w-full"
  //                 onClick={() => getUsersData(UserRolesEnum.TEACHER)}
  //               >
  //                 Teacher
  //               </TabsTrigger>
  //               <TabsTrigger
  //                 value="admin"
  //                 className="w-full"
  //                 onClick={() => getUsersData(UserRolesEnum.ADMIN)}
  //               >
  //                 Admin
  //               </TabsTrigger>
  //             </TabsList>
  //           </div>
  //           {/* <div className="mb-4">
  //             <SearchInputButton
  //               placeholderText="type user name"
  //               handleSearch={handleSearchUser}
  //             />
  //           </div> */}
  //           <TabsContent value="student">
  //             {loading ? (
  //               <div>
  //                 <SkeletonGenerator />
  //               </div>
  //             ) : (
  //               <TableScrollable data={users} heightTable={heightTable} />
  //             )}
  //           </TabsContent>
  //           <TabsContent value="teacher">
  //             {loading ? (
  //               <div>
  //                 <SkeletonGenerator />
  //               </div>
  //             ) : (
  //               <TableScrollable data={users} heightTable={heightTable} />
  //             )}
  //           </TabsContent>
  //           <TabsContent value="admin">
  //             {loading ? (
  //               <div>
  //                 <SkeletonGenerator />
  //               </div>
  //             ) : (
  //               <TableScrollable data={users} heightTable={heightTable} />
  //             )}
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //       <div>
  //         <Button
  //           variant="smagaLMSGreen"
  //           className="w-full mt-4"
  //           onClick={navigateToAddNewUser()}
  //         >
  //           Add New User
  //         </Button>
  //       </div>
  //       <div></div>
  //     </div>
  //   </>
  // );
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
            {renderTabsContent(UserRolesEnum.STUDENT)}
            {renderTabsContent(UserRolesEnum.TEACHER)}
            {renderTabsContent(UserRolesEnum.ADMIN)}
          </Tabs>
        </div>
        <div className="bottom-16 left-0 w-full bg-white">
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={navigateToAddNewUser}
          >
            Add New User
          </Button>
        </div>
      </div>
    </>
  );
}
