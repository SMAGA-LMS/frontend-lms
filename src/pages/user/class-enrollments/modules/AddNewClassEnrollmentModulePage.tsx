import { CourseDto } from "@/components/courses/course";
import BasicSkelenton from "@/components/global/BasicSkelenton";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorPage from "@/pages/ErrorPage";
import courseService from "@/services/apis/courses/courseService";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import courseModuleService from "@/services/apis/course-modules/courseModuleService";

// TODO: ini nanti perlu disesuaiin, cuma baru copy aja dari AddNewCourseModulePage
// kerjain backend nya dulu soalnya
export interface addNewCourseModulePayload {
  courseID: number;

  name: string;
  description: string;
  file?: File | null;
}

export default function AddNewClassEnrollmentModulePage() {
  const pageTitle = "Tambah Modul";
  const { id } = useParams<{ id: string }>();

  const initialFormData: addNewCourseModulePayload = {
    courseID: Number(id),
    name: "",
    description: "",
    file: null,
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);

  const [formData, setFormData] =
    useState<addNewCourseModulePayload>(initialFormData);
  const [course, setCourse] = useState<CourseDto>();

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(Number(id));
      setLoading(false);

      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };

    getCourseDetail();
  }, [id]);

  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  const createFormData = (data: addNewCourseModulePayload) => {
    const formData = new FormData();
    formData.append("courseID", data.courseID.toString());
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }
    return formData;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form data", formData);

    const payload: addNewCourseModulePayload = {
      courseID: Number(id),
      name: formData.name,
      description: formData.description,
    };

    if (formData.file) {
      payload.file = formData.file;
    }

    const payloadFormData = createFormData(payload);

    console.log("Payload", payload);

    setLoading(true);
    const response = await courseModuleService.addNewCourseModule(
      payloadFormData
    );
    setLoading(false);

    if (response.success && response.data) {
      setErrors(null);
      toast.success(response.message);
      navigate(`/courses/${id}/modules`, { replace: true });
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
    setIsFileSelected(false);
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mt-4 pb-24 bg-smagaLMS-gradient-linear">
        {loading ? (
          <BasicSkelenton additionalClassName="mx-4" />
        ) : (
          <div className="mx-4 mt-4">
            <h1 className="font-bold font-sans text-lg">
              {course?.name} | {course?.grade}
            </h1>
            <Badge variant="default">{course?.id}</Badge>
          </div>
        )}
      </div>
      <div className="mx-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div className="my-2">
            <Label htmlFor="name" className="text-right font-semibold">
              Judul
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Pertemuan 1 - Geometri Dasar"
              className="text-sm"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="description" className="text-right font-semibold">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Pada materi ini akan mempelajari tentang..."
              className="text-sm"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
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
          {errors && <ErrorDisplay errors={errors} />}
          {loading ? (
            <ButtonLoading
              variant="smagaLMSGreen"
              size="lg"
              className="w-full rounded-lg"
            />
          ) : (
            <Button
              type="submit"
              variant="smagaLMSGreen"
              className="w-full mt-2 mb-4"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
