import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
    navigate("/login");
  }
  return (
    <>
      <div>Profile Page</div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mx-24">
          <ButtonWithIcon variant="secondary" type="submit">
            <LogOut className="mr-4" />
            <Label className="font-sans font-bold text-base mr-4">Logout</Label>
          </ButtonWithIcon>
        </div>
      </form>
    </>
  );
}
