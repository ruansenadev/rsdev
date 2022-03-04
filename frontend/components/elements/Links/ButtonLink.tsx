import { ButtonProps as ChakraButtonProps, Button as ChakraButton, Box, LinkOverlay, LinkBox } from "@chakra-ui/react";
import NextLink from "next/link";
import { ElementComponent, IButtonLink } from "../../../types/elements";

interface ButtonLinkProps extends ChakraButtonProps, ElementComponent<IButtonLink> {
  wrapLinkOutside?: boolean;
}

export function ButtonLink({ data, wrapLinkOutside, ...rest }: ButtonLinkProps) {
  const isInternalLink = data.url.startsWith("/");

  if (wrapLinkOutside) {
    // uses linkoverlay el to be wrap on outside with a linkbox
    if (isInternalLink) {
      return (
        <>
          <ChakraButton
            variant={data.variant}
            leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
            rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
            {...rest}
          >
            {data.text}
          </ChakraButton>
          <NextLink href={data.url} passHref>
            <LinkOverlay />
          </NextLink>
        </>
      );
    }

    if (data.newTab) {
      return (
        <>
          <ChakraButton
            variant={data.variant}
            leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
            rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
            {...rest}
          >
            {data.text}
          </ChakraButton>
          <LinkOverlay href={data.url} isExternal />
        </>
      );
    }

    return (
      <>
        <ChakraButton
          variant={data.variant}
          leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
          rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
          {...rest}
        >
          {data.text}
        </ChakraButton>
        <LinkOverlay href={data.url} />
      </>
    );
  }

  if (isInternalLink) {
    return (
      <NextLink href={data.url} passHref>
        <ChakraButton
          as="a"
          variant={data.variant}
          leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
          rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
          {...rest}
        >
          {data.text}
        </ChakraButton>
      </NextLink>
    );
  }

  if (data.newTab) {
    return (
      <LinkBox>
        <ChakraButton
          variant={data.variant}
          leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
          rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
          {...rest}
        >
          <LinkOverlay href={data.url} isExternal>
            {data.text}
          </LinkOverlay>
        </ChakraButton>
      </LinkBox>
    );
  }

  return (
    <ChakraButton
      as="a"
      href={data.url}
      variant={data.variant}
      leftIcon={data.leftGlyph ? <Box>{data.leftGlyph}</Box> : null}
      rightIcon={data.rightGlyph ? <Box>{data.rightGlyph}</Box> : null}
      {...rest}
    >
      {data.text}
    </ChakraButton>
  );
}
