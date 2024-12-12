import AttendanceStatusEnum from "@/enums/AttendanceStatusEnum";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleXIcon,
  FrownIcon,
  MinusCircleIcon,
} from "lucide-react";
import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import React, { ReactNode } from "react";

interface IconAttributes {
  icon: ReactNode;
  color: string;
}

interface AttendanceStatusIconProps {
  attendanceStatus: string;
}

export default function AttendanceStatusIcon({
  attendanceStatus,
}: AttendanceStatusIconProps) {
  const statusMap: { [key: string]: IconAttributes } = {
    [AttendanceStatusEnum.PRESENT]: {
      icon: <CircleCheckIcon />,
      color: "#5E9660",
    },
    [AttendanceStatusEnum.ABSENT]: {
      icon: <CircleXIcon />,
      color: "#cc0000",
    },
    [AttendanceStatusEnum.PERMIT]: {
      icon: <MinusCircleIcon />,
      color: "#000000",
    },
    [AttendanceStatusEnum.SICK]: {
      icon: <FrownIcon />,
      color: "#000000",
    },
    [AttendanceStatusEnum.OTHER]: {
      icon: <CircleHelpIcon />,
      color: "#000000",
    },
  };

  const { icon, color } = statusMap[attendanceStatus] || {};

  const defaultBackgroundSecondaryColor = "#f1f5f9";

  return icon ? (
    <>
      <ItemMenuWithLabel label={attendanceStatus}>
        {React.cloneElement(icon as React.ReactElement, {
          size: 32,
          fill: color,
          color: defaultBackgroundSecondaryColor,
        })}
      </ItemMenuWithLabel>
    </>
  ) : null;
}
