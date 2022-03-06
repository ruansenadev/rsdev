import { GetStaticPropsContext } from "next";
import { Strapi } from "../lib/strapi";
import { MediaField } from "../types/api/field";
import { StrapiResponse } from "../types/api/rest";
import { IPage, IPageContext } from "../types/page";

export function getStrapiMedia(media: MediaField) {
  return media?.url.startsWith("/") ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}` : media && media.url;
}

export async function getLocalizedPage(targetLocale: string, pageContext: IPageContext) {
  const localization = pageContext.localizations.data.find((localization) => localization.attributes.locale === targetLocale);
  if (!localization) {
    // Returns default locale if locale doesn't exist
    return { locale: pageContext.defaultLocale };
  }

  const localePage = await Strapi(`/${pageContext.pageEndpoint}/${localization.id}`).then((res: StrapiResponse<IPage>) => res.data.data);
  return localePage.attributes;
}

export function localizePath(page: Omit<IPageContext, "localizedPaths">) {
  const { locale, defaultLocale } = page;

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${page.slug}`;
  }

  // should have a localePrefix
  return `/${locale}/${page.slug}`;
}

export function getLocalizedPaths(page: Omit<IPageContext, "localizedPaths">) {
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    };
  });

  return paths;
}
