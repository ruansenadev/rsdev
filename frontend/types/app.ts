import { ImageField } from "./api/field";
import { StrapiData } from "./api/rest";

export type ISeo = {
  pageTitle: string;
  metaDescription: string;
  shareImage: StrapiData<ImageField>;
};

export type IGlobalApp = {
  siteName: string;
  favicon: StrapiData<ImageField>;
  metaAuthor: string;
  defaultSeo: ISeo;
};
