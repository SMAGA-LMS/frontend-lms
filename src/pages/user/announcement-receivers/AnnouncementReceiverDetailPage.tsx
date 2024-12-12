import { AnnouncementReceiverDto } from "@/components/announcement-receivers/announcementReceiver";
import AnnouncementHeader from "@/components/announcements/AnnouncementHeader";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ErrorPage from "@/pages/ErrorPage";
import announcementReceiverService from "@/services/apis/announcement-receivers/announcementReceiverService";
import { EyeIcon, PaperclipIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function AnnouncementReceiverDetailPage() {
  const pageTitle = "Announcement Detail";

  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [announcementReceiver, setAnnouncementReceiver] =
    useState<AnnouncementReceiverDto>();

  useEffect(() => {
    const getAnnouncementReceiverDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response =
        await announcementReceiverService.getAnnouncementReceiverByID(
          Number(id)
        );
      setLoading(false);

      if (response.success && response.data) {
        setAnnouncementReceiver(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getAnnouncementReceiverDetail();
  }, [id]);

  useEffect(() => {
    if (!announcementReceiver || !currentUser) {
      return;
    }

    console.log("announcementReceiver", announcementReceiver);

    const isValidReceiverRole = () => {
      return currentUser?.role === announcementReceiver.receiverRole;
    };

    const isUserAdmin = () => {
      return currentUser?.role === UserRolesEnum.ADMIN;
    };

    // check if the current user is an admin (argument value will be false for user that has role admin), then they can access this page
    // Check if the current user role is receiver role of this announcement
    if (!isUserAdmin() && !isValidReceiverRole()) {
      // setHasErrorPage(true);
      setTimeout(() => {
        toast.warning("You are not authorized to access this page");
      }, 300);
      navigate("/home", { replace: true });
      return;
    }
  }, [announcementReceiver, currentUser, navigate]);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const handleViewFile = () => {
    if (announcementReceiver?.announcement.file) {
      window.open(announcementReceiver.announcement.file, "_blank");
    }
  };

  const getFileName = (filePath: string): string => {
    const fileName = filePath.split("/").pop() || "";
    return fileName.length > 25 ? `${fileName.substring(0, 25)}...` : fileName;
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <div>
            {announcementReceiver?.announcement && (
              <AnnouncementHeader
                announcement={announcementReceiver.announcement}
              />
            )}
          </div>
        )}
        <Separator className="my-2" />

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">
            {announcementReceiver?.announcement.title}
          </h3>
          <p className="text-sm leading-relaxed">
            {announcementReceiver?.announcement.description}
          </p>
        </Card>

        {announcementReceiver?.announcement.file && (
          <div className="flex items-center justify-between space-x-2 mt-2">
            <PaperclipIcon size="24" />
            <span className="text-black flex-grow">
              {getFileName(announcementReceiver.announcement.file)}
            </span>
            <Button
              type="button"
              variant="outline"
              className="p-2"
              onClick={handleViewFile}
            >
              <EyeIcon size="24" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
