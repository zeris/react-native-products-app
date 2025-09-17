import { ReactNode } from "react";
import { User } from "./User";

export interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}