import { createContext, ReactNode } from "react";
import { IGlobalApp } from "../types/app";

export const GlobalContext = createContext<IGlobalApp>({} as IGlobalApp);

interface GlobalContextProviderProps {
  data: IGlobalApp;
  children: ReactNode;
}

export function GlobalContextProvider({ data, children }: GlobalContextProviderProps) {
  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>;
}
