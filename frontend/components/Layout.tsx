import { Flex, Box } from "@chakra-ui/react";
import { ReactNode, useContext } from "react";
import { GlobalContext } from "../contexts/globalContext";
import { Footer } from "./elements/Footer";
import { Navbar } from "./elements/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { siteName, navbar, footer } = useContext(GlobalContext);
  return (
    <Flex direction="column" align="stretch" minH="100vh" w="full" maxW="container.md" mx="auto">
      <Box flex="1">
        <Navbar navbar={navbar} siteName={siteName} />
        <Box>{children}</Box>
      </Box>
      <Footer w="full" footer={footer} />
    </Flex>
  );
}
