import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClassroomDto } from "@/components/classrooms/classrooms";
import classroomService from "@/services/apis/classrooms/classroomService";
import ErrorPage from "@/pages/ErrorPage";

export default function ClassroomDetailPage() {
  const pageTitle = "Detail Kelas";

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  // const { classPeriodCode } = useParams() as { classPeriodCode: string };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classroom, setClassroom] = useState<ClassroomDto>();

  useEffect(() => {
    async function getClassroomDetail() {
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
    }
    getClassroomDetail();
  }, [id, navigate]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToPeople = () => {
    navigate(`/classrooms/${id}/people`);
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle}>
        {loading ? (
          <BasicSkelenton />
        ) : (
          <ButtonWithIcon
            size="icon"
            variant="outline"
            className="bg-secondary"
            type="button"
            onClickAction={navigateToPeople}
          >
            <UsersIcon size={20} className="text-black" />
          </ButtonWithIcon>
        )}
      </HeaderPageWithBackButton>

      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
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
      <div className="mx-4">{loading && <BasicSkelenton />}</div>
    </>
  );
}
