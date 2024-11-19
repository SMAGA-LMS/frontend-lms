import { ClassEnrollmentDto } from "@/components/class-enrollments/classEnrollment";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import CardUserItem from "@/components/users/CardUserItem";
import ErrorPage from "@/pages/ErrorPage";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import { EditIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassEnrollmentDetailPage() {
  const pageTitle = "Detail Class Enrollment";

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [classEnrollment, setClassEnrollment] = useState<ClassEnrollmentDto>();

  useEffect(() => {
    const getClassEnrollmentDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await classEnrollmentService.getClassEnrollmentByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setClassEnrollment(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };

    getClassEnrollmentDetail();
  }, [id]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const navigateToAssignNewTeacher = () => {
    navigate(`/class-enrollments/${id}/people/assign-teacher`);
    return;
  };

  const navigateToPeople = () => {
    navigate(`/class-enrollments/${id}/people`);
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
              {classEnrollment?.course.name} | {classEnrollment?.course.grade}
            </h1>
            <Badge variant="default">{classEnrollment?.id}</Badge>
            <br />
            <Badge variant="outline">{classEnrollment?.classroom.name}</Badge>
          </div>
        )}
      </div>
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <CardUserItem
            user={classEnrollment?.user}
            additionalClassName="-mt-8 bg-[#3C7A89] rounded-xl"
            textFullnameColor="text-secondary"
            defaultBadgeStyle="secondary"
          >
            <ButtonWithIcon
              size="icon"
              variant="ghost"
              className="hover:bg-smagaLMS-green"
              onClickAction={() => navigateToAssignNewTeacher()}
            >
              <EditIcon size={20} className="text-white " />
            </ButtonWithIcon>
          </CardUserItem>
        )}
      </div>
    </>
  );
}
