import { Box, BoxProps, Flex, HStack, Icon, IconButton, Image, Link, useDisclosure, useColorMode, Center } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import NextLink from "next/link";
import { useState } from "react";
import { useSidebar } from "../../../contexts/SidebarContext";
import { INavbar } from "../../../types/app";
import { ActiveLink } from "../Links/ActiveLink";

import dynamic from "next/dynamic";

const DynamicSlideFade = dynamic<any>(() => import("@chakra-ui/react").then((m) => m.SlideFade), { ssr: false });

interface NavbarProps extends BoxProps {
  navbar: INavbar;
  siteName?: string;
}

export function Navbar({ navbar, siteName, ...rest }: NavbarProps) {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen: isSlide, onClose: onBlur, onOpen: onSlide } = useDisclosure({ defaultIsOpen: false });
  const [slideLeft, setSlideLeft] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const { onOpen } = useSidebar();

  return (
    <Box as="nav" py={["6", null, "4"]} {...rest}>
      <Flex align="center" justify="space-between" px="4" mx="auto" maxW="container.md">
        <Flex align="baseline" w="full">
          <NextLink href="/" passHref>
            <Link h="12" w="32" p="2" fontSize="3xl" fontWeight="semibold" letterSpacing="wide" lineHeight="none" _hover={{ textDecor: "none" }}>
              {navbar.logo?.data ? (
                <Image w={120} h={33} src={navbar.logo.data.attributes.url} alt={navbar.logo.data.attributes.alternativeText} />
              ) : (
                <Box as="h1">{siteName}</Box>
              )}
            </Link>
          </NextLink>
          <Box display={["none", null, null, "initial"]} pos="relative">
            {!!navbar.links?.length && (
              <>
                <HStack spacing={["4", null, "6"]} align="baseline" ml="10">
                  {navbar.links.map((link, i) => (
                    <ActiveLink
                      key={link.text + i}
                      data={link}
                      p="2"
                      fontWeight="medium"
                      fontSize="lg"
                      letterSpacing="wider"
                      textTransform="uppercase"
                      _hover={{ textDecor: "none" }}
                      onMouseEnter={(e) => {
                        const { offsetLeft, clientWidth } = e.currentTarget;

                        setSlideWidth(Math.round(clientWidth * 0.6));
                        setSlideLeft(Math.round(offsetLeft + clientWidth * 0.2));
                        onSlide();
                      }}
                      onMouseLeave={() => onBlur()}
                    />
                  ))}
                </HStack>
                <DynamicSlideFade in={isSlide} offsetY="4px">
                  <Box pos="absolute" left={slideLeft + "px"} h="2px" w={slideWidth + "px"} bgColor="whiteAlpha.400" shadow="md" />
                </DynamicSlideFade>
              </>
            )}
          </Box>
        </Flex>
        <HStack spacing={["4", null, "8"]}>
          <IconButton
            aria-label="Tema de cores"
            icon={
              <Center w="full" h="full">
                {colorMode === "dark" ? "☼" : "☀"}
              </Center>
            }
            fontSize="3xl"
            variant="unstyled"
            onClick={toggleColorMode}
          />
          {!!navbar.links?.length && (
            <IconButton
              display={[null, null, null, "none"]}
              aria-label="Menu principal"
              icon={<Icon as={MdMenu} />}
              fontSize="3xl"
              variant="unstyled"
              onClick={onOpen}
            />
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
