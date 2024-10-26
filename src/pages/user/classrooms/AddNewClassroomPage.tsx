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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GradeEnum from "@/enums/GradeEnum";
import classroomService from "@/services/apis/classrooms/classroomService";
import { Label } from "@radix-ui/react-label";
import { Terminal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface addNewClassroomPayload {
  name: string;
  grade: string;
}

export default function AddNewClassRoomPage() {
  const pageTitle = "Tambah Kelas";
  // const heightTable = "h-[38vh]";

  const navigate = useNavigate();

  const initialFormData: addNewClassroomPayload = {
    name: "",
    grade: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] =
    useState<addNewClassroomPayload>(initialFormData);

  const grades: string[] = Object.values(GradeEnum);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const payload: addNewClassroomPayload = {
      name: formData.name,
      grade: formData.grade,
    };

    setLoading(true);
    const response = await classroomService.addNewClassroom(payload);
    setLoading(false);

    if (response.success && response.data) {
      toast.success(response.message);
      navigate("/classrooms");
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(null);
  }

  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
        <form onSubmit={handleFormSubmit} method="post">
          <div className="grid gap-4 py-4 rounded-lg">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Kelas
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="XII IPA 4"
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
                >
                  <SelectTrigger className="w-full" id="role" name="role">
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
          </div>
          {errors && <ErrorDisplay errors={errors} />}

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
                            htmlFor="name"
                            className="text-right col-span-1"
                          >
                            Nama Kelas
                          </Label>
                          <div className="col-span-2">{formData.name}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="grade" className="text-right">
                            Tingkatan Kelas
                          </Label>
                          <div className="col-span-2">{formData.grade}</div>
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
