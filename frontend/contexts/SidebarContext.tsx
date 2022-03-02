import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

const SidebarContext = createContext<UseDisclosureReturn>({} as UseDisclosureReturn);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();
  const { onClose } = disclosure;

  useEffect(() => {
    onClose();
  }, [router.asPath, onClose]);

  return <SidebarContext.Provider value={disclosure}>{children}</SidebarContext.Provider>;
}

export const useSidebar = () => useContext(SidebarContext);
