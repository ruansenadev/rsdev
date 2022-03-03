import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Image, useBreakpointValue } from "@chakra-ui/react";
import { useSidebar } from "../../../contexts/SidebarContext";
import { INavbar } from "../../../types/app";
import { SidebarNav } from "./SidebarNav";

interface SidebarProps {
  navbar: INavbar;
  siteName?: string;
}

export function Sidebar({ navbar, siteName }: SidebarProps) {
  const { isOpen, onClose } = useSidebar();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent p="4">
            <DrawerCloseButton fontSize="xl" right="4" boxSize="10" mt={["5", null, "3"]} />
            <DrawerHeader>
              <Box h="12" w="32" p="2" fontSize="3xl" fontWeight="semibold" letterSpacing="wide" lineHeight="none" _hover={{ textDecor: "none" }}>
                {navbar?.logo.data ? (
                  <Image w={120} h={33} src={navbar.logo.data.attributes.url} alt={navbar.logo.data.attributes.alternativeText} />
                ) : (
                  <Box as="h1">{siteName}</Box>
                )}
              </Box>
            </DrawerHeader>

            <DrawerBody>
              <SidebarNav navbar={navbar} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return null;
}
