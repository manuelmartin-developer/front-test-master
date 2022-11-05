import { createContext } from "react";

export interface ICursorTextProps {
  cursorText: string;
  setCursorText: React.Dispatch<React.SetStateAction<string>>;
}
export const CursorTextContext = createContext({} as ICursorTextProps);
