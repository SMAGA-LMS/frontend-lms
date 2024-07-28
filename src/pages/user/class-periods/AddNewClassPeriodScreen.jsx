import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import TableWithSearchFeature from "@/components/TableWithSearchFeature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Terminal } from "lucide-react";

export default function AddNewClassPeriodScreen() {
  const pageTitle = "Tambah Kelas";

  const classrooms = [
    {
      value: "1",
      label: "X A1",
    },
    {
      value: "2",
      label: "X A2",
    },
    {
      value: "3",
      label: "XI A1",
    },
    {
      value: "4",
      label: "XI A2",
    },
    {
      value: "5",
      label: "XII A1",
    },
    {
      value: "6",
      label: "XII A2",
    },
  ];

  const academicTerms = [
    {
      value: "2023/2024",
      label: "2023/2024",
    },
    {
      value: "2024/2025",
      label: "2024/2025",
    },
    {
      value: "2025/2026",
      label: "2025/2026",
    },
  ];

  const heightTable = "h-[38vh]";

  const teachers = [
    {
      fullname: "John Doe",
      userCode: "123456",
      profilePicture: "https://i.pravatar.cc/300",
    },
    {
      fullname: "Jane Doe",
      userCode: "123457",
      profilePicture: "https://i.pravatar.cc/301",
    },
    {
      fullname: "John Doe",
      userCode: "123458",
      profilePicture: "https://i.pravatar.cc/302",
    },
    {
      fullname: "Jane Doe",
      userCode: "123459",
      profilePicture: "https://i.pravatar.cc/303",
    },
    {
      fullname: "John Doe",
      userCode: "123460",
      profilePicture: "https://i.pravatar.cc/304",
    },
    {
      fullname: "Jane Doe",
      userCode: "123461",
      profilePicture: "https://i.pravatar.cc/305",
    },
    {
      fullname: "John Doe",
      userCode: "123462",
      profilePicture: "https://i.pravatar.cc/306",
    },
    {
      fullname: "Jane Doe",
      userCode: "123463",
      profilePicture: "https://i.pravatar.cc/307",
    },
    {
      fullname: "John Doe",
      userCode: "123464",
      profilePicture: "https://i.pravatar.cc/308",
    },
    {
      fullname: "Jane Doe",
      userCode: "123465",
      profilePicture: "https://i.pravatar.cc/309",
    },
  ];

  function handleClick() {
    console.log("Submit");
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
        <div>
          <Label>Nama Kelas</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Nama Kelas" />
            </SelectTrigger>
            <SelectContent>
              {classrooms.map((classroom, index) => (
                <SelectItem key={index} value={classroom.value}>
                  {classroom.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Tahun Ajaran</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Tahun Ajaran" />
            </SelectTrigger>
            <SelectContent>
              {academicTerms.map((academicTerm, index) => (
                <SelectItem key={index} value={academicTerm.value}>
                  {academicTerm.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="rounded-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Cari Guru?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div> */}
        <div>
          {/* <div className="mb-2">
            <SearchInputButton placeholderText="Search Teacher" />
          </div>
          <ScrollArea className={`${heightTable} rounded-md`}>
            {teachers.map((teacher, index) => (
              <div className="mb-2" key={index}>
                <CardUserItem user={teacher} />
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea> */}

          <TableWithSearchFeature
            dataTable={teachers}
            heightTable={heightTable}
            id="sticky-table"
          >
            <div className="mb-4">
              <SearchInputButton placeholderText="type teacher name ..." />
            </div>
          </TableWithSearchFeature>
        </div>

        {/* <TableWithSearchFeature dataTable={teachers} heightTable={heightTable}>
          <div className="mb-2">
            <SearchInputButton
              placeholderText="type teacher name ..."
              className=""
            />
          </div>
        </TableWithSearchFeature> */}
        <div>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Lihat kelas yang akan ditambahkan :
              </AccordionTrigger>
              <AccordionContent>
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="font-semibold">
                    Informasi kelas berdasarkan input anda:
                  </AlertTitle>
                  <AlertDescription>
                    <div className="grid gap-2 py-2 rounded-lg">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="fullname"
                          className="text-right col-span-1"
                        >
                          Nama Kelas
                        </Label>
                        <div className="col-span-2">X A1</div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Tahun Ajaran
                        </Label>
                        <div className="col-span-2">2023/2024</div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Wali Kelas
                        </Label>
                        <div className="col-span-3">
                          <CardUserItem user={teachers[0]} />
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                  <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                    kode kelas dapat dilihat setelah anda mengirimkan data
                  </p>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mb-4">
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
