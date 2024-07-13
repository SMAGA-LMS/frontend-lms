import "./App.css";
import { Input } from "./components/ui/input";
import ItemPerson from "./components/ui/ItemPerson";

function App() {
  return (
    <>
      <Input type="email" placeholder="Username" />
      <ItemPerson />
    </>
  );
}

export default App;
