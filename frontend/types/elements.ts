export type ILink = {
  text: string;
  url: string;
  isExternal: boolean;
};

export type IButton = {
  text: string;
  variant: "ghost" | "outline" | "solid" | "link";
  leftGlyph?: string;
  rightGlyph?: string;
};

export type IButtonLink = IButton & ILink;

export type ISocial = {
  social: "github" | "linkedin" | "whatsapp" | "instagram" | "facebook";
  url: string;
};
