import { ButtonProps } from "@chakra-ui/react";
import { StrapiComp } from "./api/rest";

export interface ElementComponent<T> {
  data: T;
}

export type ILink = {
  text: string;
  url: string;
  newTab: boolean;
};

export type IButton = Pick<ButtonProps, "variant"> & {
  text: string;
  leftGlyph?: string;
  rightGlyph?: string;
};

export type IButtonLink = IButton & ILink;

export type ISocial = {
  social: "github" | "linkedin" | "whatsapp" | "instagram" | "facebook";
  url: string;
};

export type ActionCard = {
  description: string;
  button: StrapiComp<IButtonLink>;
};
