import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/global/InputWithLabel";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import { useStateContext } from "@/contexts/ContextProvider";
import { toast } from "sonner";
import { UserDto } from "@/components/users/users";
import authService from "@/services/apis/auth/authService";
import ErrorDisplay, { Errors } from "@/components/global/ErrorDisplay";

export interface FormData {
  username: string;
  password: string;
  deviceName?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const formDataRef = useRef<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrentUser, setToken } = useStateContext() as {
    setCurrentUser: (user: UserDto | null) => void;
    setToken: (token: string | null) => void;
  };

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    formDataRef.current[name] = value;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload: FormData = {
      username: formDataRef.current.username,
      password: formDataRef.current.password,
      deviceName: navigator.userAgent,
    };

    setLoading(true);
    const response = await authService.login(payload);
    setLoading(false);

    if (response.success && response.data) {
      const { user, token } = response.data;

      setCurrentUser(user);
      setToken(token);
      toast.success(response.message);

      navigate("/home");
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-center justify-center h-screen mx-10"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="items-center justify-center mb-4">
            <h1 className="text-3xl font-sans font-bold text-center mb-4 text-[#3F414E]">
              Welcome !
            </h1>
            <p className="text-center font-bold text-[#A1A4B2]">
              LOGIN WITH USERNAME
            </p>
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <InputWithLabel className="grid w-full items-center gap-1.5">
                <Label htmlFor="userID">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="bg-smagaLMS-soft-white"
                  onChange={handleChange}
                />
              </InputWithLabel>
            </div>
            <div className="mb-4">
              <InputWithLabel>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="bg-smagaLMS-soft-white"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </InputWithLabel>
            </div>
            {errors && <ErrorDisplay errors={errors} />}
          </div>
          <div>
            {loading ? (
              <ButtonLoading
                variant="smagaLMSGreen"
                size="lg"
                className="w-full rounded-lg"
              />
            ) : (
              <ButtonWithIcon
                variant="smagaLMSGreen"
                size="lg"
                className="w-full rounded-lg"
                // type="submit"
              >
                <LogIn className="mr-2" />
                <Label className="font-sans font-bold text-base mr-4">
                  LOGIN
                </Label>
              </ButtonWithIcon>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
