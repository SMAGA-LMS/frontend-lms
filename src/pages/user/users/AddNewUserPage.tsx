import HeaderPageWithBackButton from "@/components/global/HeaderPageWithBackButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PopUpCard from "@/components/global/PopUpCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import UserGenderEnum from "@/enums/UserGenderEnum";
import UserRolesEnum from "@/enums/UserRoleEnum";
import axiosClient from "@/services/axiosClient";
import { InfoIcon, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

export default function AddNewUserPage() {
  const pageTitle = "Tambah User";
  const [roles, setRoles] = useState<UserRolesEnum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<any | null>(null);

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axiosClient.get("/roles");
        setRoles(response.data.data);
      } catch (error) {
        toast.error("Something went wrong, failed to get data roles");
      }
    }
    getRoles();
  }, []);

  interface response {
    message: string;
    data: {
      username: string;
      password: string;
    };
  }

  async function addNewUser(payload: formData) {
    setLoading(true);
    try {
      const response = await axiosClient.post("/users", payload);
      if (response.status === 201) {
        toast.success(response.data.message);
        // setIsPopUpDisplayed(true);
        setResponseData(response.data.data);
        setFormData(initialFormData);
        setErrors([]);
      }
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong, failed to add new user");
      }
    } finally {
      setLoading(false);
    }
  }

  interface formData {
    fullName: string;
    roleId: string;
    gender: string;
    birthDate: string;
  }

  const initialFormData: formData = {
    fullName: "",
    roleId: "",
    gender: "",
    birthDate: "",
  };

  const [formData, setFormData] = useState<formData>(initialFormData);

  function handleFormSubmit(e) {
    e.preventDefault();
    addNewUser(formData);
  }

  function handleStringToInt(val: string): number {
    return parseInt(val);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

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
                      Menambahkan user baru ke dalam sistem dibutuhkan data
                      terkait:
                    </p>
                    <ol className="list-decimal ml-4">
                      <li>Nama lengkap</li>
                      <li>Role user yang akan ditambahkan</li>
                      <li>Gender</li>
                      <li>Tanggal lahir</li>
                    </ol>
                    <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                      Username dan password akan dibuatkan secara otomatis,
                      pastikan anda menyimpan data tersebut dengan baik.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-4 py-4 rounded-lg">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="M. Syauqi Frizman"
                className="col-span-2"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>

              <div className="col-span-2">
                <Select
                  onValueChange={(val) => {
                    const event = {
                      target: {
                        name: "role_id",
                        value: handleStringToInt(val),
                      },
                    };
                    handleInputChange(event);
                  }}
                >
                  <SelectTrigger className="w-full" id="role" name="role">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={`${role}`}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <div className="col-span-2">
                <Select
                  onValueChange={(val) => {
                    const event = {
                      target: {
                        name: "gender",
                        value: val,
                      },
                    };
                    handleInputChange(event);
                  }}
                >
                  <SelectTrigger className="w-full" id="gender" name="gender">
                    <SelectValue placeholder="Pilih Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={`${UserGenderEnum.MALE}`}>
                      MALE
                    </SelectItem>
                    <SelectItem value={`${UserGenderEnum.FEMALE}`}>
                      FEMALE
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birth_date" className="text-right">
                Tanggal Lahir
              </Label>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {errors && (
            <div className="text-red-500 text-sm text-center my-2">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key]}</p>
              ))}
            </div>
          )}
          {responseData && (
            <div>
              <p className="text-center py-1 italic">
                Credential information for new user
              </p>
              <p className="p-4 bg-green-200 rounded-lg mb-4 font-bold italic">
                Username: {responseData.username}
                <br />
                Password: {responseData.username}
              </p>
            </div>
          )}
          <Separator />
          <div className="">
            <div>
              <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">
                    Lihat user yang akan ditambahkan:
                  </AccordionTrigger>
                  <AccordionContent>
                    <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertTitle className="font-semibold">
                        Informasi user berdasarkan input anda:
                      </AlertTitle>
                      <AlertDescription>
                        <div className="grid gap-2 py-2 rounded-lg">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="fullName"
                              className="text-right col-span-1"
                            >
                              Nama Lengkap
                            </Label>
                            <div className="col-span-2 text-wrap">
                              {formData.fullName}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                              Role
                            </Label>
                            <div className="col-span-2">{formData.roleId}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right">
                              Gender
                            </Label>
                            <div className="col-span-2">{formData.gender}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="birth_date" className="text-right">
                              Tanggal Lahir
                            </Label>
                            <div className="col-span-2">
                              {formData.birthDate}
                            </div>
                          </div>
                        </div>
                      </AlertDescription>
                      <p className="mt-2 text-center font-semibold bg-secondary rounded-md p-2">
                        Username dan password akan dibuatkan secara otomatis,
                        pastikan anda menyimpan data tersebut dengan baik.
                      </p>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
