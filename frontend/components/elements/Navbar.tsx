import { Box, BoxProps, Flex, Heading, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { INavbar } from "../../types/app";

interface NavbarProps extends BoxProps {
  navbar: INavbar;
  siteName?: string;
}

export function Navbar({ navbar, siteName, ...rest }: NavbarProps) {
  return (
    <Box as="nav" py={["6", null, "4"]} {...rest}>
      <Flex align="center" justify="space-between" px="4" mx="auto" maxW="container.md">
        <Flex align="center">
          <NextLink href="/" passHref>
            <Link h="8" w="32" fontSize="3xl" fontWeight="semibold" letterSpacing="wide" lineHeight="none" _hover={{ textDecor: "none" }}>
              {navbar?.logo.data ? (
                <Image w={120} h={33} src={navbar.logo.data.attributes.url} alt={navbar.logo.data.attributes.alternativeText} />
              ) : (
                <Box as="h1" h="full">
                  {siteName}
                </Box>
              )}
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
}
