import { Flex, Box } from "@chakra-ui/react";
import { ReactNode, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Footer } from "./elements/Layout/Footer";
import { Navbar } from "./elements/Layout/Navbar";
import { Sidebar } from "./elements/Layout/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { siteName, navbar, footer } = useContext(GlobalContext);
  return (
    <Flex direction="column" align="stretch" minH="100vh" w="full" maxW="container.md" mx="auto">
      <Navbar navbar={navbar} siteName={siteName} />
      <Flex as="main" flex="1" align="stretch">
        {children}
      </Flex>
      <Footer footer={footer} />
      <Sidebar navbar={navbar} siteName={siteName} />
    </Flex>
  );
}
