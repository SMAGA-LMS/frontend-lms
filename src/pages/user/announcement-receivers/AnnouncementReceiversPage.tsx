import { AnnouncementReceiverDto } from "@/components/announcement-receivers/announcementReceiver";
import CardAnnouncement from "@/components/announcements/CardAnnouncement";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import SkeletonGenerator from "@/components/global/SkeletonGenerator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import announcementReceiverService from "@/services/apis/announcement-receivers/announcementReceiverService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AnnouncementReceiversPage() {
  const pageTitle = "Announcements";

  const navigate = useNavigate();
  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [announcementReceivers, setAnnouncementReceivers] = useState<
    AnnouncementReceiverDto[]
  >([]);

  useEffect(() => {
    const getAnnouncementReceiversData = async () => {
      if (!currentUser) {
        return;
      }

      setLoading(true);
      const response =
        await announcementReceiverService.getAnnouncementReceivers(
          currentUser.role
        );
      setLoading(false);
      if (response.success && response.data) {
        setAnnouncementReceivers(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getAnnouncementReceiversData();
  }, [currentUser]);

  const navigateToAddNewAnnouncementReceiver = () => {
    navigate("/announcements/create");
    return;
  };

  const isAnnouncementReceiversEmpty = announcementReceivers.length === 0;

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <div>
            <SkeletonGenerator />
          </div>
        ) : (
          <div>
            <div className="my-3">
              <div>
                <Label className="font-semibold">
                  Total Announcements: {announcementReceivers.length}
                </Label>
              </div>
              <div>
                {isAnnouncementReceiversEmpty && (
                  <Label className="text-sm text-gray-500">
                    Tidak ada Announcement yang tersedia
                  </Label>
                )}
              </div>
            </div>

            <div>
              {!isAnnouncementReceiversEmpty && (
                <div>
                  {announcementReceivers.map((announcementReceiver, index) => (
                    <Link
                      to={`/announcements/${announcementReceiver.id}`}
                      key={index}
                      className="block"
                    >
                      <CardAnnouncement
                        key={index}
                        data={announcementReceiver.announcement}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {currentUser?.role !== UserRolesEnum.STUDENT && (
          <div className="fixed bottom-4 left-4 right-4 flex justify-center">
            <Button
              variant="smagaLMSGreen"
              className="w-[calc(100%)] max-w-[22rem] rounded-lg"
              type="submit"
              onClick={navigateToAddNewAnnouncementReceiver}
            >
              Tambah Announcement Baru
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
