import CardUserItem from "@/components/CardUserItem";
import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import SearchInputButton from "@/components/SearchInputButton";
import TableWithActionFeature from "@/components/TableWithActionFeature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import SkeletonUserCard from "@/components/ui/SkeletonUserCard";
import UserRolesEnum from "@/enums/UserRoleEnum";
import axiosClient from "@/services/axiosClient";
import { CircleIcon, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddNewClassPeriodScreen() {
  const pageTitle = "Tambah Kelas";
  const heightTable = "h-[38vh]";

  const [users, setUsers] = useState([]);
  const [virtualUsers, setVirtualUsers] = useState([]);

  useEffect(() => {
    getUsersData(UserRolesEnum.TEACHER);
  }, []);

  async function getUsersData(userRoleId) {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/users?role_id=${userRoleId.toString()}`
      );
      setUsers(response.data.data);
      setVirtualUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  const [loading, setLoading] = useState(false);

  const [gradeClassrooms, setGradeClassrooms] = useState([]);
  // const [selectedGradeClassroom, setSelectedGradeClassroom] = useState(null);

  const [academicTerms, setAcademicTerms] = useState([]);
  // const [selectedAcademicTerm, setSelectedAcademicTerm] = useState(null);

  const [errors, setErrors] = useState([]);

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function getGradeClassroomsName() {
      setLoading(true);
      try {
        const response = await axiosClient.get("/grade-classrooms");
        setGradeClassrooms(response.data.data);
        // setSelectedGradeClassroom(response.data.data[0].id);
      } catch (error) {
        toast.error("Failed to fetch grade and classroom data");
      } finally {
        setLoading(false);
      }
    }

    async function getAcademicTerm() {
      setLoading(true);
      try {
        const response = await axiosClient.get("/academic-terms");
        setAcademicTerms(response.data.data);
        // setSelectedAcademicTerm(response.data.data[0].id);
      } catch (error) {
        toast.error("Failed to fetch academic term data");
      } finally {
        setLoading(false);
      }
    }

    getGradeClassroomsName();
    getAcademicTerm();
  }, []);

  function handleSearchUser(value) {
    // setSelectedUser(null);
    // setIsUserSelected(false);
    setResetSelected(true);
    if (value === "") {
      setVirtualUsers(users);
      return;
    }

    const filteredData = virtualUsers.filter((virtualUser) =>
      virtualUser.full_name.toLowerCase().includes(value.toLowerCase())
    );

    setVirtualUsers(filteredData);
  }

  const initialFormData = {
    grade_classroom_id: "",
    academic_term_id: "",
    user_id: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  async function addNewClassPeriod(payload) {
    setLoading(true);
    try {
      const response = await axiosClient.post("/class-periods", payload);
      if (response.status === 201) {
        toast.success(response.data.message);
        setResponseData(response.data.data);
        setFormData(initialFormData);
        setErrors([]);
      }
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong, failed to add new user");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("form data: ", formData);
    addNewClassPeriod(formData);
  }

  function handleStringToInt(val) {
    return parseInt(val);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function generateSkeletonList() {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonUserCard key={index} />
        ))}
      </>
    );
  }

  function getClassroomNameById(id) {
    const classroom = gradeClassrooms.find(
      (gc) => gc.grade_classroom_id === parseInt(id)
    );
    return classroom ? classroom.grade_classroom_name : "";
  }

  function getAcademicTermNameById(id) {
    const term = academicTerms.find((t) => t.id === parseInt(id));
    return term ? term.name : "";
  }

  function getUserById(id) {
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return null;
    }

    const cardUser = {
      full_name: user.full_name,
      user_code: user.user_code,
      avatar: user.avatar,
    };
    return cardUser;
  }

  const [resetSelected, setResetSelected] = useState(false);
  function handleSelectedUser(id) {
    // setIsUserSelected(true);
    console.log("selected user id add screen: ", id);
    setFormData({
      ...formData,
      ["user_id"]: id,
    });
    console.log("users: ", users);
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div>
            <Label>Tingkatan dan Nama Kelas</Label>
            {/* <Select onValueChange={(value) => setSelectedGradeClassroom(value)}> */}
            <Select
              onValueChange={(val) => {
                const event = {
                  target: {
                    name: "grade_classroom_id",
                    value: handleStringToInt(val),
                  },
                };
                handleInputChange(event);
              }}
              value={formData.grade_classroom_id}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Nama Kelas" />
              </SelectTrigger>
              <SelectContent>
                {gradeClassrooms.map((gradeClassroom, index) => (
                  <SelectItem
                    key={index}
                    value={gradeClassroom.grade_classroom_id}
                  >
                    {gradeClassroom.grade_classroom_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tahun Ajaran</Label>
            {/* <Select onValueChange={(value) => setSelectedAcademicTerm(value)}> */}
            <Select
              onValueChange={(val) => {
                const event = {
                  target: {
                    name: "academic_term_id",
                    value: handleStringToInt(val),
                  },
                };
                handleInputChange(event);
              }}
              value={formData.academic_term_id}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Tahun Ajaran" />
              </SelectTrigger>
              <SelectContent>
                {academicTerms.map((term, index) => (
                  <SelectItem key={index} value={term.id}>
                    {term.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-center my-2">
              <p>Wali Kelas boleh diisi nanti</p>
            </div>
            <div className="mb-2">
              <SearchInputButton
                placeholderText="Search Guru"
                handleSearch={handleSearchUser}
              />
              <Separator className="my-3" />
            </div>
            {loading ? (
              generateSkeletonList()
            ) : (
              <div>
                <TableWithActionFeature
                  dataTable={virtualUsers}
                  heightTable={heightTable}
                  handleSelectedItem={handleSelectedUser}
                  resetSelected={resetSelected}
                >
                  <ButtonWithIcon size="icon" variant="ghost" type="button">
                    <CircleIcon className="h-4 w-4" />
                  </ButtonWithIcon>
                </TableWithActionFeature>
              </div>
            )}
          </div>

          {errors && (
            <div className="text-red-500 text-sm text-center my-2">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key]}</p>
              ))}
            </div>
          )}

          <div>
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  Lihat kelas yang akan ditambahkan :
                </AccordionTrigger>
                <AccordionContent>
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="font-semibold">
                      Informasi kelas berdasarkan input anda:
                    </AlertTitle>
                    <AlertDescription>
                      <div className="grid gap-2 py-2 rounded-lg">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="full_name"
                            className="text-right col-span-1"
                          >
                            Nama Kelas
                          </Label>
                          <div className="col-span-2">
                            {getClassroomNameById(formData.grade_classroom_id)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Tahun Ajaran
                          </Label>
                          <div className="col-span-2">
                            {getAcademicTermNameById(formData.academic_term_id)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Wali Kelas
                          </Label>
                          <div className="col-span-3">
                            {/* {} */}
                            <CardUserItem
                              user={getUserById(formData.user_id)}
                            />
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                    <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                      kode kelas dapat dilihat setelah anda mengirimkan data
                    </p>
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
        </form>
      </div>
    </>
  );
}
