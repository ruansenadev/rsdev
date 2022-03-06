import { ColorProps } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { ReactElement } from "react";
import { CustomLink, CustomLinkProps } from "./CustomLink";

interface ActiveLinkProps extends CustomLinkProps {
  children?: ReactElement;
  shouldMatchPathname?: boolean;
  activeColor?: ColorProps["color"];
}

export function ActiveLink({ children, shouldMatchPathname = false, activeColor = "purple.500", ...rest }: ActiveLinkProps) {
  const { pathname, locale } = useRouter();
  let isActive = false;

  if (rest.locale) {
    const pathnameLocale = `/${locale}${pathname}`;

    // If locale is explicit in link should match router locale
    if (rest.locale === locale) {
      if (shouldMatchPathname && (pathnameLocale === rest.href || pathnameLocale === rest.as || pathnameLocale === rest.data?.url)) {
        isActive = true;
      }

      if (
        !shouldMatchPathname &&
        (pathnameLocale.startsWith(String(rest.href)) || pathnameLocale.startsWith(String(rest.as)) || pathnameLocale.startsWith(rest.data?.url))
      ) {
        isActive = true;
      }
    }
  } else {
    if (shouldMatchPathname && (pathname === rest.href || pathname === rest.as || pathname === rest.data?.url)) {
      isActive = true;
    }

    if (
      !shouldMatchPathname &&
      (pathname.startsWith(String(rest.href)) || pathname.startsWith(String(rest.as)) || pathname.startsWith(rest.data?.url))
    ) {
      isActive = true;
    }
  }

  return <CustomLink {...{ ...rest, color: isActive ? activeColor : rest.color }}>{children}</CustomLink>;
}
