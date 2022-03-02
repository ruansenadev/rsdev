import { ButtonProps as ChakraButtonProps, Button as ChakraButton, Box, LinkOverlay, LinkBox } from "@chakra-ui/react";
import NextLink from "next/link";
import { IButtonLink } from "../../../types/elements";

interface ButtonLinkProps extends ChakraButtonProps {
  buttonLink: IButtonLink;
}

export function ButtonLink({ buttonLink, ...rest }: ButtonLinkProps) {
  const isInternalLink = buttonLink.url.startsWith("/");

  if (isInternalLink) {
    return (
      <NextLink href={buttonLink.url} passHref>
        <ChakraButton
          as="a"
          variant={buttonLink.variant}
          leftIcon={buttonLink.leftGlyph ? <Box>{buttonLink.leftGlyph}</Box> : null}
          rightIcon={buttonLink.rightGlyph ? <Box>{buttonLink.rightGlyph}</Box> : null}
          {...rest}
        >
          {buttonLink.text}
        </ChakraButton>
      </NextLink>
    );
  }

  if (buttonLink.isExternal) {
    return (
      <LinkBox>
        <ChakraButton
          variant={buttonLink.variant}
          leftIcon={buttonLink.leftGlyph ? <Box>{buttonLink.leftGlyph}</Box> : null}
          rightIcon={buttonLink.rightGlyph ? <Box>{buttonLink.rightGlyph}</Box> : null}
          {...rest}
        >
          <LinkOverlay href={buttonLink.url} isExternal>
            {buttonLink.text}
          </LinkOverlay>
        </ChakraButton>
      </LinkBox>
    );
  }

  return (
    <ChakraButton
      as="a"
      href={buttonLink.url}
      variant={buttonLink.variant}
      leftIcon={buttonLink.leftGlyph ? <Box>{buttonLink.leftGlyph}</Box> : null}
      rightIcon={buttonLink.rightGlyph ? <Box>{buttonLink.rightGlyph}</Box> : null}
      {...rest}
    >
      {buttonLink.text}
    </ChakraButton>
  );
}
