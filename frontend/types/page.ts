import { StrapiDynamicZone } from "./api/rest";
import { ISeo } from "./app";
import { MainActions } from "./sections";

export type IPage = {
  seo: ISeo;
};

export type IHomePage = IPage & {
  contentSections: StrapiDynamicZone<MainActions>;
};
