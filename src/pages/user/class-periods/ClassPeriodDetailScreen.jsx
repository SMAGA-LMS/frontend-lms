import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import BasicSkelenton from "@/components/ui/BasicSkelenton";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import axiosClient from "@/services/axiosClient";
import { EditIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassPeriodDetailScreen() {
  const pageTitle = "Detail Kelas";

  const { classPeriodCode } = useParams();
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

  const navigate = useNavigate();
  function handleButtonIconClick() {
    navigate(`people`);
  }
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
            onClickAction={handleButtonIconClick}
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
              {classPeriod.class_period.name}
            </h1>
            <Badge variant="default">{classPeriod.class_period.code}</Badge>
          </div>
        )}
      </div>
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <CardUserItem
            user={classPeriod.teacher}
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
        )}
      </div>
    </>
  );
}
