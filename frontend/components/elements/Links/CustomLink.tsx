import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ILink } from "../../../types/elements";
import { ReactNode } from "react";

export interface CustomLinkProps extends LinkProps {
  link?: ILink;
  children?: ReactNode;
}

export function CustomLink({ link, children, ...rest }: CustomLinkProps) {
  const isInternalLink = String(link?.url).startsWith("/") || String(rest.href).startsWith("/");

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <NextLink href={link?.url ?? rest.href} passHref>
        <Link {...{ ...rest, href: null }}>{link?.text ?? children}</Link>
      </NextLink>
    );
  }

  // Plain <a> tags for external links
  if (link?.isExternal || rest.isExternal) {
    return (
      <Link href={link?.url} isExternal {...rest}>
        {link?.text ?? children}
      </Link>
    );
  }

  return (
    <Link href={link?.url} {...rest}>
      {link?.text ?? children}
    </Link>
  );
}
