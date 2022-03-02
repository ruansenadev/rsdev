import { Box, BoxProps, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { IFooter } from "../../../types/app";
import { Social } from "../Social";

interface FooterProps extends BoxProps {
  footer: IFooter;
}

export function Footer({ footer, ...rest }: FooterProps) {
  return (
    <Box as="footer" pt={["8", null, "12"]} {...rest}>
      <Flex direction={["column", "row"]} justify={[null, "space-between"]} px={["8", null, "12"]}>
        <Box>
          {footer.logo?.data && <Image w={120} h={33} src={footer.logo.data.attributes.url} alt={footer.logo.data.attributes.alternativeText} />}
        </Box>
        <HStack spacing={["4", null, "6"]} align="flex-start" justify={[null, null, "flex-end"]} mb={["6", null, "10"]}>
          {footer.socials?.map((social) => (
            <Social key={social.social + social.id} data={social} fontSize="3xl" />
          ))}
        </HStack>
      </Flex>
      {footer.smallText && (
        <Box py={["2", null, "4"]} px={["8", null, "12"]}>
          <Text as="h6" fontSize={["sm", null, "md"]} color="gray.200">
            {footer.smallText}
          </Text>
        </Box>
      )}
    </Box>
  );
}
