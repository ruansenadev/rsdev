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
  const { pathname } = useRouter();
  let isActive = false;

  if (shouldMatchPathname && (pathname === rest.href || pathname === rest.link?.url)) {
    isActive = true;
  }

  if (!shouldMatchPathname && (pathname.startsWith(String(rest.href)) || pathname.startsWith(rest.link?.url))) {
    isActive = true;
  }

  return <CustomLink {...{ ...rest, color: isActive ? activeColor : rest.color }}>{children}</CustomLink>;
}
