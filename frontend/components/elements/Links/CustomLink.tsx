import NextLink from "next/link";
import { Link, LinkOverlay, LinkProps } from "@chakra-ui/react";
import { ElementComponent, ILink } from "../../../types/elements";
import { LinkProps as NextLinkProps } from "next/link";

export interface CustomLinkProps extends LinkProps, Partial<ElementComponent<ILink>>, Pick<NextLinkProps, "locale"> {
  wrapLinkOutside?: boolean;
}

export function CustomLink({ data, children, wrapLinkOutside, locale, ...rest }: CustomLinkProps) {
  const isInternalLink = String(data?.url).startsWith("/") || String(rest.href).startsWith("/");

  if (wrapLinkOutside) {
    // uses linkoverlay el to be wrap on outside with a linkbox
    if (isInternalLink) {
      return (
        <NextLink href={data?.url ?? rest.href} locale={locale && locale} passHref>
          <LinkOverlay {...{ ...rest, href: null }}>{data?.text ?? children}</LinkOverlay>
        </NextLink>
      );
    }

    if (data?.newTab || rest.isExternal) {
      return (
        <LinkOverlay href={data?.url} isExternal {...rest}>
          {data?.text ?? children}
        </LinkOverlay>
      );
    }

    return (
      <LinkOverlay href={data?.url} {...rest}>
        {data?.text ?? children}
      </LinkOverlay>
    );
  }

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <NextLink href={data?.url ?? rest.href} locale={locale && locale} passHref>
        <Link {...{ ...rest, href: null }}>{data?.text ?? children}</Link>
      </NextLink>
    );
  }

  // Plain <a> tags for external links
  if (data?.newTab || rest.isExternal) {
    return (
      <Link href={data?.url} isExternal {...rest}>
        {data?.text ?? children}
      </Link>
    );
  }

  return (
    <Link href={data?.url} {...rest}>
      {data?.text ?? children}
    </Link>
  );
}
