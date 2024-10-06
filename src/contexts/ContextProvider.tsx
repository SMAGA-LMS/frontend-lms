import { UserDto } from "@/components/users/users";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
  currentUser: UserDto | null;
  token: string | null;
  setCurrentUser: (user: UserDto | null) => void;
  setToken: (token: string | null) => void;
}

// Create context with default values
const StateContext = createContext<StateContextType>({
  currentUser: null,
  token: null,
  setCurrentUser: () => {},
  setToken: () => {},
});

// Define props type for ContextProvider
interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserDto | null>({
    id: "1",
    createdAt: new Date(),
    fullName: "Syauqi",
    role: UserRolesEnum.ADMIN,
  });

  const [token, setToken] = useState<string | null>(
    // localStorage.getItem("ACCESS_TOKEN")
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MzIwNjYwNzIsImV4cCI6MTYzMjA2NjA3Mn0.1"
  );

  return (
    <StateContext.Provider
      value={{ currentUser, token, setCurrentUser, setToken }}
    >
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to use the StateContext
export const useStateContext = () => useContext(StateContext);
