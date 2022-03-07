import axios from "axios";
import qs from "qs";
import { StrapiAttr, StrapiError, StrapiResponse, StrapiResponseList } from "../types/api/rest";
import { IGlobalApp } from "../types/app";
import { IPage } from "../types/page";

export const Strapi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  paramsSerializer: (params) => qs.stringify(params),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_READ_TOKEN}`,
  },
});

export async function getGlobalData(locale: string): Promise<StrapiAttr<IGlobalApp>> {
  return await Strapi.get("global", {
    params: {
      locale,
      populate: {
        favicon: "*",
        defaultSeo: { populate: "*" },
        navbar: { populate: "*" },
        footer: { populate: "*" },
      },
    },
  })
    .then((res: StrapiResponse<IGlobalApp>) => res.data.data.attributes)
    .catch((err: StrapiError) => {
      console.error(err.response?.data.error ?? err.toJSON());
      return { favicon: {}, defaultSeo: {}, navbar: {}, footer: {} } as StrapiAttr<IGlobalApp>;
    });
}

export async function getPageData({ locale, slug }: { locale: string; slug: string }): Promise<StrapiAttr<IPage>> {
  return (
    (await Strapi.get("pages", {
      params: {
        filters: {
          slug: { $eq: slug },
        },
        locale,
        populate: ["seo", "seo.shareImage", "contentSections", "contentSections.cards", "contentSections.cards.button", "localizations"],
      },
    })
      .then((res: StrapiResponseList<IPage>) => res.data.data[0]?.attributes)
      .catch((err: StrapiError) => {
        if (err.response?.data.error) {
          if (err.response.data.error.status !== 404) {
            console.error(err.response.data.error);
          }
        } else {
          console.error(err.toJSON());
        }
        return null;
      })) || ({ seo: {}, contentSections: [], localizations: { data: [] }, slug } as StrapiAttr<IPage>)
    // Giving the page no sections will trigger a 404 page
  );
}
