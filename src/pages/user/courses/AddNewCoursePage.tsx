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
import { Input } from "@/components/ui/input";
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
import { UserDto } from "@/components/users/users";
import GradeEnum from "@/enums/GradeEnum";
import UserRolesEnum from "@/enums/UserRoleEnum";
import courseService from "@/services/apis/courses/courseService";
import userService from "@/services/apis/users/userService";
import { InfoIcon, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface addNewCoursePayload {
  name: string;
  grade: string;
  userID?: string;
}

export default function AddNewCoursePage() {
  const pageTitle = "Tambah Mata Pelajaran Baru";
  //   const heightTable = "h-[38vh]";

  const navigate = useNavigate();

  const initialFormData: addNewCoursePayload = {
    name: "",
    grade: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] =
    useState<addNewCoursePayload>(initialFormData);
  const [teachers, setTeachers] = useState<UserDto[]>([]);
  const grades: string[] = Object.values(GradeEnum);

  useEffect(() => {
    const getTeachers = async () => {
      setLoading(true);
      const response = await userService.getUsers(UserRolesEnum.TEACHER);
      setLoading(false);

      if (response.success && response.data) {
        setTeachers(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getTeachers();
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const payload: addNewCoursePayload = {
      name: formData.name,
      grade: formData.grade,
    };

    // Conditionally add the teacher field if it has a value
    if (formData.userID) {
      payload.userID = formData.userID;
    }

    setLoading(true);
    const response = await courseService.addNewCourse(payload);
    setLoading(false);

    if (response.success && response.data) {
      setErrors(null);
      toast.success(response.message);
      navigate("/courses", { replace: true });
      return;
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(null);
  };

  const getUserById = (id: string): UserDto | undefined => {
    const user = teachers.find((u) => u.id.toString() === id);
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
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  <InfoIcon size="24" />
                  Info Penting!
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p>
                      Menambahkan mata pelajaran baru ke dalam sistem dibutuhkan
                      data terkait:
                    </p>
                    <ol className="list-decimal ml-4">
                      <li>Nama Mata Pelajaran</li>
                      <li>Tingkatan Kelas</li>
                      <li>Guru atau Pengajar (Opsional)</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-4 py-4 rounded-lg">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Mata Pelajaran
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Matematika Wajib"
                className="col-span-2"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Tingkatan Kelas
              </Label>

              <div className="col-span-2">
                <Select
                  onValueChange={(val) => {
                    const event = {
                      target: {
                        name: "grade",
                        value: val,
                      },
                    };
                    handleInputChange(event);
                  }}
                  required
                >
                  <SelectTrigger className="w-full" id="grade" name="grade">
                    <SelectValue placeholder="Pilih tingkatan kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={`${grade}`}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacher" className="text-right">
                Pengajar
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
                >
                  <SelectTrigger className="w-full" id="teacher" name="teacher">
                    <SelectValue placeholder="Pilih pengajar" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
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
                  Lihat mata pelajaran yang akan ditambahkan :
                </AccordionTrigger>
                <AccordionContent>
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="font-semibold">
                      Informasi mata pelajaran berdasarkan input anda:
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
                          <div className="col-span-2">{formData.name}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="grade" className="text-right">
                            Tingkatan Kelas
                          </Label>
                          <div className="col-span-2">{formData.grade}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="teacher" className="text-right">
                            Pengajar
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
                    {/* <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                      kode kelas dapat dilihat setelah anda mengirimkan data
                    </p> */}
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
              className="w-full mt-2 mb-16"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
