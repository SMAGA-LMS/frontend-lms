import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import { EditIcon, MoreHorizontalIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClassPeriodDetailScreen() {
  const pageTitle = "Detail Kelas";

  const teacher = {
    fullname: "Budi Santoso",
    userCode: "USR-001",
    profilePicture: "/images/avatar.jpg",
  };

  const classPeriod = {
    name: "XI A1",
    academicTerm: "2023/2024",
    classPeriodCode: "CP-001",
  };

  const navigate = useNavigate();
  function handleButtonIconClick() {
    navigate("/admin/class-periods/detail/people");
  }
  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle}>
        <ButtonWithIcon
          size="icon"
          variant="outline"
          className="bg-secondary"
          type="button"
          onClickAction={handleButtonIconClick}
        >
          <UsersIcon size={20} className="text-black" />
        </ButtonWithIcon>
      </HeaderPageWithBackButton>

      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        <div className="mx-4 mt-4">
          <h1 className="font-bold font-sans text-lg">
            {classPeriod.name} - {classPeriod.academicTerm}
          </h1>
          <Badge variant="default">{classPeriod.classPeriodCode}</Badge>
        </div>
      </div>
      <div className="mx-4">
        <CardUserItem
          user={teacher}
          additionalClassName="-mt-8 bg-[#3C7A89] rounded-xl"
          textFullnameColor="text-secondary"
          defaultBadgeStyle="secondary"
        >
          <ButtonWithIcon
            size="icon"
            variant="ghost"
            className="hover:bg-smagaLMS-green"
          >
            <EditIcon size={20} className="text-white " />
          </ButtonWithIcon>
        </CardUserItem>
      </div>
    </>
  );
}
