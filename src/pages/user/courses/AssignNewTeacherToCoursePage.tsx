import { CourseDto } from "@/components/courses/course";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CardUserItem from "@/components/users/CardUserItem";
import { UserDto } from "@/components/users/user";
import UserRolesEnum from "@/enums/UserRoleEnum";
import courseService from "@/services/apis/courses/courseService";
import userService from "@/services/apis/users/userService";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export interface assignNewTeacherPayload {
  userID?: string | null;
}

export default function AssignNewTeacherToCoursePage() {
  const pageTitle = "PIC Mata Pelajaran";

  const navigate = useNavigate();

  const initialFormData: assignNewTeacherPayload = {
    userID: null,
  };

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] =
    useState<assignNewTeacherPayload>(initialFormData);

  const [teachers, setTeachers] = useState<UserDto[]>([]);

  const [course, setCourse] = useState<CourseDto>();

  useEffect(() => {
    const noTeacher: UserDto = {
      name: "<<hapus PIC>>",
      username: "null",
      role: UserRolesEnum.TEACHER,
      id: 0,
    };

    const getTeachers = async () => {
      setLoading(true);
      const response = await userService.getUsers(UserRolesEnum.TEACHER);
      setLoading(false);

      if (response.success && response.data) {
        setTeachers([noTeacher, ...response.data]);
      } else {
        toast.error(response.message);
      }
    };
    getTeachers();
  }, []);

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!id) {
        toast.error("Invalid course ID");
        return;
      }

      setLoading(true);
      const response = await courseService.getCourseDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setCourse(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          userID: response.data?.user?.id?.toString() || null,
          courseID: response.data?.id?.toString() || null,
        }));
      } else {
        toast.error(response.message);
      }
    };

    getCourseDetail();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!id) {
      toast.error("Invalid course ID");
      return;
    }

    const payload: assignNewTeacherPayload = {};

    payload.userID = formData.userID;
    if (formData.userID === "0" || formData.userID === null) {
      payload.userID = null;
    }

    if (course?.user === null && payload.userID === null) {
      toast.error("Pilih PIC terlebih dahulu");
      return;
    }

    setLoading(true);
    const response = await courseService.assignNewTeacher(payload, id);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      navigate(`/courses/${id}`, { replace: true });
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(null);
  };

  const getUserById = (id: string): UserDto | undefined => {
    const user = teachers.find((u) => u.id.toString() === id);
    console.log("user", user?.name);
    if (!user) {
      return undefined;
    }
    return user;
  };

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div>
            <div className="grid gap-4 py-4 rounded-lg">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">
                  PIC Mata Pelajaran
                </Label>

                <div className="col-span-2">
                  <Select
                    onValueChange={(val) => {
                      const event = {
                        target: {
                          name: "userID",
                          value: val,
                        },
                      };
                      handleInputChange(event);
                    }}
                    value={formData.userID?.toString() || undefined}
                  >
                    <SelectTrigger
                      className="w-full"
                      id="teacher"
                      name="teacher"
                    >
                      <SelectValue placeholder="Pilih PIC mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers
                        .filter((teacher) => course?.user || teacher.id !== 0)
                        .map((teacher) => (
                          <SelectItem key={teacher.id} value={`${teacher.id}`}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {errors && <ErrorDisplay errors={errors} />}
            <Separator />
            <div>
              <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">
                    Lihat PIC mata pelajaran yang akan ditambahkan :
                  </AccordionTrigger>
                  <AccordionContent>
                    <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertTitle className="font-semibold">
                        Informasi PIC mata pelajaran berdasarkan input anda:
                      </AlertTitle>
                      <AlertDescription>
                        <div className="grid gap-2 py-2 rounded-lg">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="name"
                              className="text-right col-span-1"
                            >
                              Nama Mata Pelajaran
                            </Label>
                            <div className="col-span-2">{course?.name}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="grade" className="text-right">
                              Tingkatan Kelas
                            </Label>
                            <div className="col-span-2">{course?.grade}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="teacher" className="text-right">
                              PIC Mata Pelajaran
                            </Label>
                            <div className="col-span-3">
                              {formData.userID && (
                                <CardUserItem
                                  user={getUserById(formData.userID)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </AlertDescription>
                      {formData.userID === "0" && (
                        <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                          PIC mata pelajaran sebelumnya akan dihapus dari mata
                          pelajaran ini
                        </p>
                      )}
                    </Alert>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
          </div>
        </form>
      </div>
    </>
  );
}
