import { ClockIcon } from "lucide-react";
import { AnnouncementDto } from "./announcement";

interface CardAnnouncementProps {
  data: AnnouncementDto;
}

export default function CardAnnouncement({ data }: CardAnnouncementProps) {
  return (
    <>
      <div className="flex w-full bg-smagaLMS-green/90 rounded-lg p-4 mb-2 justify-between">
        <div className="mr-4 text-left">
          <div className="font-semibold text-white">
            {data.title.length > 60
              ? `${data.title.substring(0, 60)}...`
              : data.title}
          </div>
          <div className="flex items-center mt-1">
            <ClockIcon color="white" size={16} className="mr-2" />
            <p className="text-white text-sm">
              {data.createdAt
                ? new Date(data.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date not available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
