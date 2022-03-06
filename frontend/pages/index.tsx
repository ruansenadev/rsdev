import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { getGlobalData, getPageData } from "../lib/strapi";
import { StrapiAttr } from "../types/api/rest";
import { IPage, IPageContext } from "../types/page";
import { Sections } from "../components/Sections";
import { IGlobalApp } from "../types/app";
import { getLocalizedPaths } from "../utils/strapi";

interface HomeProps {
  global: IGlobalApp;
  seo: IPage["seo"];
  sections: IPage["contentSections"];
  pageContext: IPageContext;
}

export default function Home({ global, seo, sections, pageContext }: HomeProps) {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo global={global} seo={seo} />

      {/* Display content sections */}
      <Sections sections={sections} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale, locales, defaultLocale } = ctx;

  const globalLocale = await getGlobalData(locale);

  const pageData = await getPageData("homepage", locale);

  // console.log(JSON.stringify(pageData, null, 2));

  const pageContext: IPageContext = {
    slug: "",
    pageEndpoint: "homepage",
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
