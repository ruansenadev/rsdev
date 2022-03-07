import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { getGlobalData, getPageData, Strapi } from "../lib/strapi";
import { IPage, IPageContext } from "../types/page";
import { Sections } from "../components/Sections";
import { IGlobalApp } from "../types/app";
import { getLocalizedPaths } from "../utils/strapi";
import { StrapiAttr, StrapiEntry, StrapiError, StrapiResponseList } from "../types/api/rest";
import { useRouter } from "next/router";
import { Flex, Spinner } from "@chakra-ui/react";
import { ErrorPage } from "../components/sections/ErrorPage";

interface DynamicPageProps {
  global: IGlobalApp;
  seo: IPage["seo"];
  sections: IPage["contentSections"];
  pageContext: IPageContext;
}

export default function DynamicPage({ global, seo, sections, pageContext }: DynamicPageProps) {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return (
      <Layout global={global} pageContext={pageContext}>
        {/* Add meta tags for SEO*/}
        <Seo global={global} seo={seo} />
        {/* Display content sections */}
        <ErrorPage />
      </Layout>
    );
  }

  // Fallback loading screen
  if (router.isFallback) {
    return (
      <Flex align="center" justify="center" minH="100vh" w="full" mx="auto">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="purple.500" size="xl" />
      </Flex>
    );
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo global={global} seo={seo} />
      {/* Display content sections */}
      <Sections sections={sections} />
    </Layout>
  );
}

// [[...slug]].js catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // Get all pages from Strapi
  const pages: StrapiEntry<Pick<StrapiAttr<IPage>, "locale" | "slug">>[] = await ctx.locales.reduce(async (currentPagesPromise, locale) => {
    const currentPages = await currentPagesPromise;
    const localePages = await Strapi.get("pages", {
      params: {
        locale,
        fields: ["slug", "locale"],
      },
    })
      .then((res: StrapiResponseList<Pick<IPage, "slug">>) => res.data.data)
      .catch((err: StrapiError) => {
        if (err.response?.data.error) {
          if (err.response.data.error.status !== 404) {
            console.error(err.response.data.error);
          }
        } else {
          console.error(err.toJSON());
        }
        return [];
      });

    return [...currentPages, ...localePages];
  }, Promise.resolve([]));

  const paths = pages.reduce((currPaths, page) => {
    const { slug, locale } = page.attributes;
    // Decompose the slug that was saved in Strapi
    const slugArray = typeof slug === "string" && slug.split("/");
    // Specify the locale to render
    return slugArray ? [...currPaths, { params: { slug: slugArray }, locale }] : currPaths;
  }, []);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale, locales, defaultLocale, params } = ctx;

  const globalLocale = await getGlobalData(locale);

  const pageData = await getPageData({
    slug: (Array.isArray(params.slug) ? params.slug : [""]).join("/"),
    locale,
  });

  const pageContext: IPageContext = {
    slug: pageData.slug,
    locale,
    locales,
    defaultLocale,
    localizations: pageData.localizations,
  };

  pageContext.localizedPaths = getLocalizedPaths(pageContext);

  return {
    props: { global: globalLocale, seo: pageData.seo, sections: pageData.contentSections, pageContext },
    revalidate: 60 * 5,
  };
};
