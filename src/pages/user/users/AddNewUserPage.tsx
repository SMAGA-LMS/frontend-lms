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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { InfoIcon, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import userService from "@/services/apis/users/userService";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";

export interface addNewUserPayload {
  name: string;
  username: string;
  role: string;
  avatar?: string;
  password: string;
}

export default function AddNewUserPage() {
  const pageTitle = "Tambah User";

  const initialFormData: addNewUserPayload = {
    name: "",
    username: "",
    role: UserRolesEnum.STUDENT,
    password: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [formData, setFormData] = useState<addNewUserPayload>(initialFormData);
  const [responseData, setResponseData] = useState<addNewUserPayload | null>(
    null
  );

  const roles: string[] = Object.values(UserRolesEnum);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const username = formData.name.trim().substring(0, 16).toLowerCase();
    const payload: addNewUserPayload = {
      name: formData.name,
      username: username,
      role: formData.role,
      password: username,
    };

    // Conditionally add the avatar field if it has a value
    if (formData.avatar) {
      payload.avatar = formData.avatar;
    }

    setLoading(true);
    const response = await userService.addNewUser(payload);
    setLoading(false);

    if (response.success && response.data) {
      const responseData: addNewUserPayload = {
        name: response.data.name,
        username: response.data.username,
        role: response.data.role,
        password: response.data.username,
      };

      setResponseData(responseData);
      setErrors(null);
      toast.success(response.message);
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResponseData(null);
    setErrors(null);
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
              <Label htmlFor="name" className="text-right">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="M. Syauqi Frizman"
                className="col-span-2"
                value={formData.name}
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
                        name: "role",
                        value: val,
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
          </div>
          {errors && <ErrorDisplay errors={errors} />}
          {responseData && (
            <div>
              <p className="text-center py-1 italic">
                Credential information for new user
              </p>
              <p className="p-4 bg-green-200 rounded-lg mb-4 font-bold italic">
                Username: {responseData.username}
                <br />
                Password: {responseData.password}
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
                              htmlFor="name"
                              className="text-right col-span-1"
                            >
                              Nama Lengkap
                            </Label>
                            <div className="col-span-2 text-wrap">
                              {formData.name}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                              Role
                            </Label>
                            <div className="col-span-2">{formData.role}</div>
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
