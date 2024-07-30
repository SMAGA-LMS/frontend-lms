import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "@/services/axiosClient";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { useStateContext } from "@/contexts/ContextProvider";
import { toast } from "sonner";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formDataRef = useRef({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, setToken } = useStateContext();

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    formDataRef.current[name] = value;
  }

  async function login(payload) {
    setLoading(true);
    try {
      const response = await axiosClient.post("/auth/login", payload);
      setLoading(false);
      setCurrentUser(response.data.data.user);
      setToken(response.data.data.token);
      toast.success(response.data.message);

      navigate("/admin");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong, please try again later");
      }
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username: formDataRef.current.username,
      password: formDataRef.current.password,
      device_name: navigator.userAgent,
    };
    login(payload);
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
            {errors && (
              <div className="text-red-500 text-sm text-center">
                {/* {Object.keys(errors).map((key) =>
                  Array.isArray(errors[key]) ? (
                    errors[key].map((error, index) => (
                      <p key={`${key}-${index}`}>{error}</p>
                    ))
                  ) : (
                    <p key={key}>{errors}</p>
                  )
                )} */}

                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key]}</p>
                ))}
              </div>
            )}
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
                type="submit"
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
