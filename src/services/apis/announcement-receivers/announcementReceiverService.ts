import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import { ListAnnouncementReceiversResponseDto } from "./listAnnouncementReceiversResponse";

const announcementReceiverService = {
  getAnnouncementReceivers: async (
    receiverRole: string
  ): Promise<BaseResponseAPIDto<ListAnnouncementReceiversResponseDto>> => {
    try {
      let url = "/announcement-receivers";
      if (receiverRole) {
        url += `?receiver_role=${receiverRole}`;
      }
      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return handleAxiosError<ListAnnouncementReceiversResponseDto>(error);
    }
  },
};

export default announcementReceiverService;
