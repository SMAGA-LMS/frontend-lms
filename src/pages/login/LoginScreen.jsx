import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "@/services/axios-client";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { useStateContext } from "@/contexts/ContextProvider";

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
      if (response.status === 201) {
        setLoading(false);
        // nanti harus bikin dulu endpoint get user by token
        // setCurrentUser(response.data.data.user);
        setToken(response.data.data.token);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.message;
        setErrors(errors);
      } else {
        setErrors(["Something went wrong, please try again later"]);
      }
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      username: formDataRef.current.username,
      password: formDataRef.current.password,
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
              <InputWithLabel>
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
                    {/* Here you can use an icon or text to indicate visibility state */}
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </InputWithLabel>
            </div>
            {errors && (
              <div className="text-red-500 text-sm text-center">
                {Object.keys(errors).map((key) =>
                  Array.isArray(errors[key]) ? (
                    errors[key].map((error, index) => (
                      <p key={`${key}-${index}`}>{error}</p>
                    ))
                  ) : (
                    <p key={key}>{errors[key]}</p>
                  )
                )}
              </div>
            )}
          </div>
          <div>
            {loading ? (
              <ButtonLoading variant="smagaLMSGreen" />
            ) : (
              <ButtonWithIcon variant="smagaLMSGreen" type="submit">
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
