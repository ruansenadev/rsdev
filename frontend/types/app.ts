import { ImageField } from "./api/field";
import { StrapiData, StrapiComp } from "./api/rest";
import { IButtonLink, ILink, ISocial } from "./elements";

export type ISeo = {
  pageTitle: string;
  metaDescription: string;
  shareImage: StrapiData<ImageField>;
};

export type INavbar = {
  logo: StrapiData<ImageField>;
  links: StrapiComp<ILink>[];
  button: StrapiComp<IButtonLink>;
};

export type IFooter = {
  logo: StrapiData<ImageField>;
  socials: StrapiComp<ISocial>[];
  smallText: string;
};

export type IGlobalApp = {
  siteName: string;
  favicon: StrapiData<ImageField>;
  metaAuthor: string;
  defaultSeo: ISeo;
  navbar: INavbar;
  footer: IFooter;
};
