import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PopUpCard from "@/components/ui/PopUpCard";
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

export default function AddNewUserScreen() {
  const pageTitle = "Tambah User";
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [responseData, setResponseData] = useState(null);

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

  async function addNewUser(payload) {
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

  const initialFormData = {
    full_name: "",
    role_id: "",
    gender: "",
    birth_date: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleFormSubmit(e) {
    e.preventDefault();
    addNewUser(formData);
  }

  function handleStringToInt(val) {
    return parseInt(val);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function getRoleName(roleId) {
    if (roleId === 1) {
      return "ADMIN";
    } else if (roleId === 2) {
      return "TEACHER";
    } else if (roleId === 3) {
      return "STUDENT";
    }
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
              <Label htmlFor="full_name" className="text-right">
                Nama Lengkap
              </Label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="M. Syauqi Frizman"
                className="col-span-2"
                value={formData.full_name}
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
                      <SelectItem key={role.id} value={`${role.id}`}>
                        {role.name}
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
                              htmlFor="full_name"
                              className="text-right col-span-1"
                            >
                              Nama Lengkap
                            </Label>
                            <div className="col-span-2 text-wrap">
                              {formData.full_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                              Role
                            </Label>
                            <div className="col-span-2">
                              {getRoleName(formData.role_id)}
                            </div>
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
                              {formData.birth_date}
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
