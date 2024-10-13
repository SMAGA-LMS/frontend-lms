import { UserDto } from "@/components/users/users";
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
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

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
