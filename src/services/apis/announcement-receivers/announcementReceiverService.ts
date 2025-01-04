import axiosClient from "@/services/axiosClient";
import { BaseResponseAPIDto } from "../baseResponseAPI";
import { handleAxiosError } from "../handleError";
import { ListAnnouncementReceiversResponseDto } from "./listAnnouncementReceiversResponse";
import { AnnouncementReceiverResponseDto } from "./announcementReceiverResponse";

const announcementReceiverService = {
  getAnnouncementsReceiver: async (
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
  getAnnouncementReceiverByID: async (
    id: number
  ): Promise<BaseResponseAPIDto<AnnouncementReceiverResponseDto>> => {
    try {
      const response = await axiosClient.get(`/announcement-receivers/${id}`);
      return response.data;
    } catch (error) {
      return handleAxiosError<AnnouncementReceiverResponseDto>(error);
    }
  },
  addNewAnnouncementReceiver: async (
    payload: FormData
  ): Promise<BaseResponseAPIDto<ListAnnouncementReceiversResponseDto>> => {
    try {
      const reqPayload = new FormData();
      reqPayload.append("title", payload.get("title") as string);
      reqPayload.append("description", payload.get("description") as string);

      if (payload.get("file")) {
        reqPayload.append("file", payload.get("file") as File);
      }
      reqPayload.append("author_id", payload.get("authorID") as string);
      const receiverRoles = payload.getAll("receiverRoles");
      receiverRoles.forEach((role) => {
        reqPayload.append("receiver_roles[]", role);
      });

      const response = await axiosClient.post(
        "/announcement-receivers",
        reqPayload
      );
      return response.data;
    } catch (error) {
      return handleAxiosError<ListAnnouncementReceiversResponseDto>(error);
    }
  },
};

export default announcementReceiverService;
