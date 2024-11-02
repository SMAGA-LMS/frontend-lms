import { ClassroomDto } from "@/components/classrooms/classrooms";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";
import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import { StudentEnrollmentDto } from "@/components/student-enrollments/studentEnrollment";
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
import ErrorPage from "@/pages/ErrorPage";
import classroomService from "@/services/apis/classrooms/classroomService";
import studentEnrollmentService from "@/services/apis/student-enrollments/studentEnrollmentService";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export interface assignNewStudentPayload {
  userID?: string | null;
  classroomID?: string | null;
}

export default function AssignNewStudentToClassroomPage() {
  const pageTitle = "Tambah Siswa";
  // const heightTable = "h-[48vh]";

  const navigate = useNavigate();

  const initialFormData: assignNewStudentPayload = {
    userID: null,
  };

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrorPage, setHasErrorPage] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] =
    useState<assignNewStudentPayload>(initialFormData);

  const [classroom, setClassroom] = useState<ClassroomDto>();
  const [students, setStudents] = useState<UserDto[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const getClassroomDetail = async () => {
      setLoading(true);
      const response = await classroomService.getClassroomDetailByID(id);
      setLoading(false);

      if (response.success && response.data) {
        setClassroom(response.data);
      } else {
        toast.error(response.message);
        setHasErrorPage(true);
      }
    };
    getClassroomDetail();

    const getAvailableStudents = async () => {
      setLoading(true);
      const response = await studentEnrollmentService.getAvailableStudents(id);
      setLoading(false);

      if (response.success && response.data) {
        setStudents(response.data);
      } else {
        toast.error(response.message);
      }
    };
    getAvailableStudents();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!id) {
      toast.error("Invalid Classroom ID");
      return;
    }

    const payload: assignNewStudentPayload = {};

    console.log("formData", formData);

    payload.userID = formData.userID;
    payload.classroomID = id;
    if (formData.userID === "0" || formData.userID === null) {
      payload.userID = null;
    }

    if (payload.userID === null) {
      toast.error("Pilih student terlebih dahulu");
      return;
    }

    setLoading(true);
    const response = await studentEnrollmentService.assignNewStudent(payload);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      navigate(`/classrooms/${id}/people`, { replace: true });
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
    const user = students.find((u) => u.id.toString() === id);
    console.log("user", user?.name);
    if (!user) {
      return undefined;
    }
    return user;
  };

  if (hasErrorPage) {
    return <ErrorPage />;
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div>
            <div className="grid gap-4 py-4 rounded-lg">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Siswa
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
                      id="student"
                      name="student"
                    >
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={`${student.id}`}>
                          {student.name}
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
                    Lihat siswa yang akan ditambahkan :
                  </AccordionTrigger>
                  <AccordionContent>
                    <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertTitle className="font-semibold">
                        Informasi siswa berdasarkan input anda:
                      </AlertTitle>
                      <AlertDescription>
                        <div className="grid gap-2 py-2 rounded-lg">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="name"
                              className="text-right col-span-1"
                            >
                              Nama Kelas
                            </Label>
                            <div className="col-span-2">{classroom?.name}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="grade" className="text-right">
                              Tingkatan Kelas
                            </Label>
                            <div className="col-span-2">{classroom?.grade}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="student" className="text-right">
                              Siswa
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
                      {/* {formData.userID === "0" && (
                        <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                          Pengajar sebelumnya akan dihapus dari mata pelajaran
                          ini
                        </p>
                      )} */}
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
      {/* <HeaderPageWithBackButton pageTitle={pageTitle} />
      <div className="mx-4">
        <TableWithActionFeature
          dataTable={students}
          heightTable={heightTable}
          // id="sticky-table"
        >
          <div className="mb-4">
            <SearchInputButton
              placeholderText="type teacher name ..."
              // gatau ini ga kepake handleSearch nya
              handleSearch={() => {}}
            />
          </div>
        </TableWithActionFeature>
        <div>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Lihat siswa yang akan ditambahkan :
              </AccordionTrigger>
              <AccordionContent>
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="font-semibold">
                    Informasi siswa berdasarkan pilihan anda:
                  </AlertTitle>
                  <AlertDescription>
                    {selectedStudents.map((student, index) => (
                      <CardUserItem user={student} key={index} />
                    ))}
                  </AlertDescription>
                  <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                    Siswa di atas akan ditambahkan ke kelas ini.
                  </p>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-2 mb-4">
          <Button
            variant="smagaLMSGreen"
            className="w-full mt-2"
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </div> */}
    </>
  );
}
