import { ClockIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AnnouncementDto } from "./announcement";

interface AnnouncementHeaderProps {
  announcement: AnnouncementDto;
}

export default function AnnouncementHeader({
  announcement,
}: AnnouncementHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage
          alt={announcement.author.name}
          src={announcement.author.avatar}
        />
        <AvatarFallback className="bg-secondary">
          {announcement.author.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold">{announcement.author.name}</h2>
        <div className="flex items-center mt-1">
          <ClockIcon color="black" size={16} className="mr-2" />
          <p className="text-black text-sm">
            {announcement.createdAt
              ? new Date(announcement.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date not available"}
          </p>
        </div>
      </div>
    </div>
  );
}
