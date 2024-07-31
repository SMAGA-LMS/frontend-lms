import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import TableWithActionFeature from "@/components/TableWithActionFeature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Terminal } from "lucide-react";

export default function AddNewStudentToClassPeriodScreen() {
  const pageTitle = "Tambah Siswa";

  const students = [
    {
      fullname: "M. Syauqi Frizman",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/302",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/303",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/304",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/305",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/306",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/307",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/308",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/309",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/310",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/311",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/312",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/313",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/314",
    },
  ];

  const selectedStudents = [
    {
      fullname: "M. Syauqi Frizman",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/301",
    },
    {
      fullname: "Jane Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/302",
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
          id="sticky-table"
        >
          <div className="mb-4">
            <SearchInputButton placeholderText="type teacher name ..." />
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
            onClick={handleClick()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
