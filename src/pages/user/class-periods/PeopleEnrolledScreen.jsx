import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import TableWithSearchFeature from "@/components/TableWithSearchFeature";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { MoreHorizontalIcon } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function PeopleEnrolledScreen() {
  const classPeriod = {
    name: "XI A1",
    academicTerm: "2023/2024",
    classPeriodCode: "CP-001",
  };

  const teacher = {
    fullname: "Budi Santoso",
    userCode: "USR-001",
    profilePicture: "/images/avatar.jpg",
  };

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

  const heightTable = "h-[40vh]";

  const navigate = useNavigate();
  function handleNavigateToAddNewStudent() {
    navigate("/admin/class-periods/detail/people/new");
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle="List Siswa" />
      <div className="mx-4 mt-4 pb-12">
        <h1 className="font-bold font-sans text-lg">
          {classPeriod.name} - {classPeriod.academicTerm}
        </h1>
        <Badge variant="default">{classPeriod.classPeriodCode}</Badge>
      </div>
      <div className="bg-slate-200 h-full rounded-t-3xl">
        <div className="mx-4 pt-4">
          <div>
            <Label variant="default" className="font-bold">
              Wali Kelas
            </Label>
            <CardUserItem user={teacher} additionalClassName="border bg-white">
              <MoreHorizontalIcon size={24} />
            </CardUserItem>
          </div>
          <div>
            <TableWithSearchFeature
              dataTable={students}
              heightTable={heightTable}
            >
              <div className="mb-4">
                <SearchInputButton placeholderText="type student name ..." />
              </div>
            </TableWithSearchFeature>
          </div>
          <div className="mt-2 sticky bottom-4">
            <Button
              variant="smagaLMSGreen"
              className="w-full"
              type="submit"
              onClick={handleNavigateToAddNewStudent}
            >
              Tambah Siswa
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
