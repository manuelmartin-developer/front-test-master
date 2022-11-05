import { createContext } from "react";

export interface ICursorVariantProps {
  cursorVariant: string;
  setCursorVariant: React.Dispatch<React.SetStateAction<string>>;
}
export const CursorVariantContext = createContext({} as ICursorVariantProps);
