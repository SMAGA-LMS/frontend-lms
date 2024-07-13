import { LogIn, LogOut } from "lucide-react";
import "./App.css";
import ButtonWithIcon from "./components/ui/ButtonWithIcon";

function App() {
  return (
    <>
      <ButtonWithIcon>
        <LogIn /> Log In
      </ButtonWithIcon>

      <ButtonWithIcon>
        <LogOut /> Log Out
      </ButtonWithIcon>
    </>
  );
}

export default App;
