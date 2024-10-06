import CardUserItem from "@/components/users/CardUserItem";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SearchInputButton from "@/components/global/SearchInputButton";
import TableWithActionFeature from "@/components/global/TableWithActionFeature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserDto } from "@/components/users/users";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { Terminal } from "lucide-react";

export default function AddNewStudentToClassroomPage() {
  const pageTitle = "Tambah Siswa";

  const students: UserDto[] = [
    {
      id: "1",
      fullName: "M. Syauqi Frizman 1",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "2",
      fullName: "John Doe 2",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "3",
      fullName: "M. Syauqi Frizman 3",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "4",
      fullName: "John Doe 4",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "5",
      fullName: "M. Syauqi Frizman 5",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "6",
      fullName: "John Doe 6",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
  ];

  const selectedStudents = [
    {
      id: "1",
      fullName: "M. Syauqi Frizman 1",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "5",
      fullName: "M. Syauqi Frizman 5",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
    {
      id: "6",
      fullName: "John Doe 6",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
      createdAt: new Date(),
      role: UserRolesEnum.STUDENT,
    },
  ];

  const heightTable = "h-[48vh]";

  function handleClick() {}
  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        <TableWithActionFeature
          dataTable={students}
          heightTable={heightTable}
          // id="sticky-table"
        >
          <div className="mb-4">
            <SearchInputButton
              placeholderText="type teacher name ..."
              // gatau ini ga kepake handleSearch nya
              handleSearch={() => {}}
            />
          </div>
        </TableWithActionFeature>
        <div>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Lihat siswa yang akan ditambahkan :
              </AccordionTrigger>
              <AccordionContent>
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="font-semibold">
                    Informasi siswa berdasarkan pilihan anda:
                  </AlertTitle>
                  <AlertDescription>
                    {selectedStudents.map((student, index) => (
                      <CardUserItem user={student} key={index} />
                    ))}
                  </AlertDescription>
                  <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                    Siswa di atas akan ditambahkan ke kelas ini.
                  </p>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-2 mb-4">
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
