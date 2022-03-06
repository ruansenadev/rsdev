import { GetStaticPropsContext } from "next";
import { StrapiAttr, StrapiDynamicZone } from "./api/rest";
import { ISeo } from "./app";
import { MainActions } from "./sections";

export type IPage = {
  seo: ISeo;
  contentSections: StrapiDynamicZone<MainActions>;
};

export type ILocalizedPath = Pick<GetStaticPropsContext, "locale"> & { href: string; flag: string };

export type IPageContext = Required<Pick<GetStaticPropsContext, "locale" | "defaultLocale" | "locales">> &
  Required<Pick<StrapiAttr<IPage>, "localizations">> & {
    slug: string;
    pageEndpoint: string;
    localizedPaths?: ILocalizedPath[];
  };
