import { AnnouncementDto } from "@/components/announcements/announcement";
import AnnouncementHeader from "@/components/announcements/AnnouncementHeader";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import announcementReceiverService from "@/services/apis/announcement-receivers/announcementReceiverService";
import { EyeIcon, InfoIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// 'title'      => 'required|string',
// 'description' => 'required|string',
// 'file' => 'mimes:xlsx,doc,docx,ppt,pptx,pdf,png,jpeg,jpg|nullable|max:2048',
// 'author_id' => 'required|numeric|exists:users,id',

// 'receiver_roles' => ['required', 'array', Rule::in([UserRoleEnum::ADMIN, UserRoleEnum::STUDENT, UserRoleEnum::TEACHER])],
export interface addNewAnnouncementReceiverPayload {
  title: string;
  description: string;
  file?: File | null;
  authorID: number;
  receiverRoles: string[];
}

export default function AddNewAnnouncementReceiverPage() {
  const pageTitle = "Add New Announcement";

  const initialFormData: addNewAnnouncementReceiverPayload = {
    title: "",
    description: "",
    file: null,
    authorID: 0,
    receiverRoles: [UserRolesEnum.ADMIN],
  };

  const { currentUser } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const [formData, setFormData] =
    useState<addNewAnnouncementReceiverPayload>(initialFormData);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [authorAnnouncement, setAuthorAnnouncement] =
    useState<AnnouncementDto | null>(null);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const authorAnnouncement: AnnouncementDto = {
      author: currentUser,
      createdAt: new Date(),
      title: "",
      description: "",
      id: 0,
    };
    setAuthorAnnouncement(authorAnnouncement);
  }, [currentUser]);

  // const createFormData = (data: addNewAnnouncementReceiverPayload) => {
  //   console.log("Data", data);

  //   const formData = new FormData();
  //   formData.append("title", data.title);
  //   formData.append("description", data.description);
  //   if (data.file) {
  //     formData.append("file", data.file);
  //   }
  //   formData.append("authorID", String(data.authorID));
  //   formData.append("receiverRoles", JSON.stringify(data.receiverRoles));
  //   return formData;
  // };

  const createFormData = (data: addNewAnnouncementReceiverPayload) => {
    console.log("Data", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }
    formData.append("authorID", String(data.authorID));
    data.receiverRoles.forEach((role) => {
      console.log("Role", role);
      formData.append("receiverRoles", role);
    });
    return formData;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: addNewAnnouncementReceiverPayload = {
      title: formData.title,
      description: formData.description,
      authorID: currentUser?.id || 0,
      receiverRoles: formData.receiverRoles,
    };

    if (formData.file) {
      payload.file = formData.file;
    }

    console.log("Payload", payload);

    const payloadFormData = createFormData(payload);

    console.log("Payload Form Data", payloadFormData);

    setLoading(true);
    const response =
      await announcementReceiverService.addNewAnnouncementReceiver(
        payloadFormData
      );
    setLoading(false);

    if (response.success && response.data) {
      setErrors(null);
      toast.success(response.message);
      console.log("Response.data: ", response.data);
      navigate(`/announcement-receivers/${response.data[0].id}`, {
        replace: true,
      });
      return;
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors(null);
  };

  const handleInputChangeCheckbox = (event) => {
    const { name, value, checked } = event.target;

    let newReceiverRoles = formData.receiverRoles;
    if (checked) {
      newReceiverRoles.push(value);
    } else {
      newReceiverRoles = newReceiverRoles.filter((role) => role !== value);
    }

    console.log("New Receiver Roles", newReceiverRoles);

    setFormData({
      ...formData,
      [name]: newReceiverRoles,
    });
    setErrors(null);
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const handleFileChange = (event) => {
    setIsFileSelected(event.target.files && event.target.files.length > 0);
  };

  const handleViewFile = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
      URL.revokeObjectURL(url);
    }
  };

  const handleRemoveFile = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    fileInput.value = "";
    setFormData({
      ...formData,
      file: null,
    });
    setIsFileSelected(false);
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        {loading ? (
          <BasicSkelenton />
        ) : (
          <div>
            {authorAnnouncement && (
              <AnnouncementHeader announcement={authorAnnouncement} />
            )}
          </div>
        )}
        <Separator className="my-2" />
      </div>
      <div className="mx-4 mt-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div>
            <Label htmlFor="title" className="font-bold text-sm">
              Judul
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Masukkan judul"
              className="w-full text-sm mt-1"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-2">
            <Label htmlFor="description" className="font-bold text-sm">
              Isi Pesan
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Masukkan keterangan sesi"
              className="text-sm mt-1"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="file" className="text-right font-semibold mr-2">
              Lampiran
            </Label>
            <div className="flex items-center">
              <Input
                id="file"
                name="file"
                type="file"
                className="flex-1 mr-2"
                onChange={(event) => {
                  handleFileChange(event);
                  handleInputChange(event);
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="mr-2 p-2"
                onClick={handleViewFile}
                disabled={!isFileSelected}
              >
                <EyeIcon size="24" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="p-2"
                onClick={handleRemoveFile}
                disabled={!isFileSelected}
              >
                <Trash2Icon size="24" />
              </Button>
            </div>
          </div>

          <div className="mt-2">
            <Label className="font-bold text-sm">Penerima Announcement</Label>
            <span className="ml-2 text-sm text-gray-500 relative group">
              <InfoIcon className="inline-block" size={16} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Admin akan selalu mendapatkan salinan announcement, apabila
                ingin mengirim announcement khusus untuk admin saja maka tidak
                perlu memilih apapun lagi, default nya sudah dengan admin
              </div>
            </span>
            <div className="flex flex-col mt-1">
              {Object.values(UserRolesEnum).map((role) => (
                <div key={role} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={role}
                    name="receiverRoles"
                    value={role}
                    className="h-4 w-4"
                    onChange={handleInputChangeCheckbox}
                    defaultChecked={role === UserRolesEnum.ADMIN}
                    disabled={role === UserRolesEnum.ADMIN}
                  />
                  <Label htmlFor={role} className="ml-2 text-sm">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {errors && <ErrorDisplay errors={errors} />}

          <div className="fixed bottom-4 left-4 right-4 flex justify-center">
            {loading ? (
              <ButtonLoading
                variant="smagaLMSGreen"
                size="lg"
                className="w-[calc(100%)] max-w-[22rem] rounded-lg"
              />
            ) : (
              <Button
                type="submit"
                variant="smagaLMSGreen"
                className="w-[calc(100%)] max-w-[22rem] rounded-lg"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
