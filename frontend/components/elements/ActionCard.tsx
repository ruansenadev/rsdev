import { LinkBox, LinkBoxProps, Text } from "@chakra-ui/react";
import { ActionCard, ElementComponent } from "../../types/elements";
import { ButtonLink } from "./Links/ButtonLink";

export function ActionCard({ data, ...rest }: LinkBoxProps & ElementComponent<ActionCard>) {
  return (
    <LinkBox maxW="64" py="4" px="6" {...rest}>
      <ButtonLink data={data.button} size="lg" w="full" my="1" justifyContent="space-between" fontSize="2xl" wrapLinkOutside />
      <Text d={["none", "block"]} pl="2">
        {data.description}
      </Text>
    </LinkBox>
  );
}
