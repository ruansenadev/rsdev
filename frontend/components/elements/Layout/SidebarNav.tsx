import { VStack } from "@chakra-ui/react";
import { INavbar } from "../../../types/app";
import { ActiveLink } from "../Links/ActiveLink";

interface SidebarNavProps {
  navbar: INavbar;
}

export function SidebarNav({ navbar }: SidebarNavProps) {
  return (
    <VStack spacing={["4", null, "6"]} align="flex-start" mt="10">
      {navbar.links?.map((link, i) => (
        <ActiveLink
          key={link.text + i}
          data={link}
          p="2"
          fontWeight="medium"
          fontSize="lg"
          letterSpacing="wider"
          textTransform="uppercase"
          _hover={{ textDecor: "none" }}
        />
      ))}
    </VStack>
  );
}
