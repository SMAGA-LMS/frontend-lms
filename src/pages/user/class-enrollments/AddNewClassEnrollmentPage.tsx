import { ClassroomDto } from "@/components/classrooms/classrooms";
import { CourseDto } from "@/components/courses/courses";
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
import { UserDto } from "@/components/users/users";
import UserRolesEnum from "@/enums/UserRoleEnum";
import classEnrollmentService from "@/services/apis/class-enrollments/classEnrollmentService";
import classroomService from "@/services/apis/classrooms/classroomService";
import courseService from "@/services/apis/courses/courseService";
import userService from "@/services/apis/users/userService";
import { InfoIcon, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface addNewClassEnrollmentPayload {
  courseID: string;
  classroomID: string;
  userID: string;
}

export default function AddNewClassEnrollmentPage() {
  const pageTitle = "Daftarkan Kelas ke Course Baru";
  //   const heightTable = "h-[38vh]";

  const navigate = useNavigate();

  const initialFormData: addNewClassEnrollmentPayload = {
    courseID: "",
    classroomID: "",
    userID: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] =
    useState<addNewClassEnrollmentPayload>(initialFormData);
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);
  const [teachers, setTeachers] = useState<UserDto[]>([]);

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

    const getCourses = async () => {
      setLoading(true);
      const response = await courseService.getCourses();
      setLoading(false);

      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getCourses();

    const getClassrooms = async () => {
      setLoading(true);
      const response = await classroomService.getClassrooms();
      setLoading(false);

      if (response.success && response.data) {
        setClassrooms(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getClassrooms();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const payload: addNewClassEnrollmentPayload = {
      courseID: formData.courseID,
      classroomID: formData.classroomID,
      userID: formData.userID,
    };

    setLoading(true);
    const response = await classEnrollmentService.addNewClassEnrollment(
      payload
    );
    setLoading(false);

    if (response.success && response.data) {
      setErrors(null);
      toast.success(response.message);
      navigate(`/class-enrollments/${response.data.id}`, { replace: true });
      return;
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(null);
  };

  const getClassroomById = (id: string): ClassroomDto | undefined => {
    const classroom = classrooms.find((c) => c.id.toString() === id);
    if (!classroom) {
      return undefined;
    }
    return classroom;
  };

  const getCourseById = (id: string): CourseDto | undefined => {
    const course = courses.find((c) => c.id.toString() === id);
    if (!course) {
      return undefined;
    }
    return course;
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
                      Mendaftarkan kelas ke mata pelajaran pada sistem
                      dibutuhkan data terkait:
                    </p>
                    <ol className="list-decimal ml-4">
                      <li>Nama Kelas</li>
                      <li>Nama Mata Pelajaran</li>
                      <li>Guru atau Pengajar</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-4 py-4 rounded-lg">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classroomID" className="text-right">
                Nama Kelas
              </Label>

              <div className="col-span-2">
                <Select
                  onValueChange={(val) => {
                    const event = {
                      target: {
                        name: "classroomID",
                        value: val,
                      },
                    };
                    handleInputChange(event);
                  }}
                  required
                >
                  <SelectTrigger
                    className="w-full"
                    id="classroomID"
                    name="classroomID"
                  >
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms.map((classroom) => (
                      <SelectItem key={classroom.id} value={`${classroom.id}`}>
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseID" className="text-right">
                Nama Mata Pelajaran
              </Label>

              <div className="col-span-2">
                <Select
                  onValueChange={(val) => {
                    const event = {
                      target: {
                        name: "courseID",
                        value: val,
                      },
                    };
                    handleInputChange(event);
                  }}
                  required
                >
                  <SelectTrigger
                    className="w-full"
                    id="courseID"
                    name="courseID"
                  >
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={`${course.id}`}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacherID" className="text-right">
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
                  <SelectTrigger
                    className="w-full"
                    id="teacherID"
                    name="teacherID"
                  >
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
                  Lihat data yang akan ditambahkan :
                </AccordionTrigger>
                <AccordionContent>
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="font-semibold">
                      Informasi data berdasarkan input anda:
                    </AlertTitle>
                    <AlertDescription>
                      <div className="grid gap-2 py-2 rounded-lg">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="classroomID"
                            className="text-right col-span-1"
                          >
                            Nama Kelas
                          </Label>
                          <div className="col-span-2">
                            {getClassroomById(formData.classroomID)?.name}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="courseID" className="text-right">
                            Nama Mata Pelajaran
                          </Label>
                          <div className="col-span-2">
                            {getCourseById(formData.courseID)?.name}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="teacherID" className="text-right">
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
