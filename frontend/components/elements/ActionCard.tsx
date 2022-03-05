import { LinkBox, LinkBoxProps, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ActionCard, ElementComponent } from "../../types/elements";
import { ButtonLink } from "./Links/ButtonLink";

export function ActionCard({ data, ...rest }: LinkBoxProps & ElementComponent<ActionCard>) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <LinkBox
      maxW="64"
      py="4"
      px="6"
      borderRadius="md"
      boxShadow={isActive && "outline"}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      {...rest}
    >
      <ButtonLink
        data={data.button}
        wrapLinkOutside
        size="lg"
        w="full"
        mb={[null, "1", "2", "3"]}
        justifyContent="space-between"
        fontSize="2xl"
        animation={isActive && "floatingUp 2s ease-in-out infinite"}
      />
      <Text
        d={["none", "block"]}
        pl="2"
        fontWeight="medium"
        color="teal.500"
        bgGradient={isActive ? "linear(to-r, orange.300, cyan.400)" : "linear(to-r,  green.500, teal.500)"}
        bgClip="text"
      >
        {data.description}
      </Text>
    </LinkBox>
  );
}
