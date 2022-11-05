import { createContext } from "react";

export interface IUserSearchProps {
  userSearch: string | undefined;
  setUserSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const UserSearchContext = createContext({} as IUserSearchProps);
