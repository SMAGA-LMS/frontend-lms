import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
    navigate("/user/home");
  }

  return (
    <>
      <form
        className="flex flex-col items-center justify-center h-screen mx-10"
        // style={{ height: "calc(100vh - 100px)" }}
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="items-center justify-center mb-4">
            <h1 className="text-3xl font-sans font-bold text-center mb-4 text-[#3F414E]">
              Welcome !
            </h1>
            <p className="text-center font-bold text-[#A1A4B2]">
              LOGIN WITH EMAIL
            </p>
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <InputWithLabel>
                <Label htmlFor="userID">User ID</Label>
                <Input
                  type="number"
                  id="userID"
                  name="userID" // Added name attribute for form control
                  placeholder="User ID"
                  className="bg-[#F2F3F7] text-[#A1A4B2]"
                />
              </InputWithLabel>
            </div>
            <div className="mb-8">
              <InputWithLabel>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password" // Added name attribute for form control
                  placeholder="Password"
                  className="bg-[#F2F3F7] text-[#A1A4B2]"
                />
              </InputWithLabel>
            </div>
          </div>
          <div>
            <ButtonWithIcon
              variant="smagaLMSGreen"
              type="submit"
              label={"Login"}
            >
              <LogIn className="mr-4" />
            </ButtonWithIcon>
          </div>
        </div>
      </form>
    </>
  );
}
