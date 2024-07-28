import HeaderPageWithBackButton from "@/components/HeaderPageWithBackButton";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, Terminal, TerminalSquareIcon } from "lucide-react";

export default function AddNewUserScreen() {
  const pageTitle = "Tambah User";
  return (
    <>
      <HeaderPageWithBackButton pageTitle={pageTitle} />

      <div className="mx-4">
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
            <Label htmlFor="fullname" className="text-right">
              Nama Lengkap
            </Label>
            <Input
              id="name"
              placeholder="M. Syauqi Frizman"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <div className="col-span-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <div className="col-span-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Laki-Laki</SelectItem>
                  <SelectItem value="FEMALE">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthDate" className="text-right">
              Tanggal Lahir
            </Label>
            <Input id="birthDate" type="date" className="col-span-2" />
          </div>
        </div>
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
                            htmlFor="fullname"
                            className="text-right col-span-1"
                          >
                            Nama Lengkap
                          </Label>
                          <div className="col-span-2">M. Syauqi Frizman</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <div className="col-span-2">Student</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Gender
                          </Label>
                          <div className="col-span-2">Laki-Laki</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Tanggal Lahir
                          </Label>
                          <div className="col-span-2">27-02-2002</div>
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

        <Button
          type="submit"
          variant="smagaLMSGreen"
          className="w-full mt-2 mb-4"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
