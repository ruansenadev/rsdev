import Head from "next/head";
import { IGlobalApp, ISeo } from "../types/app";
import { getStrapiMedia } from "../utils/strapi";

interface SeoProps {
  global: IGlobalApp;
  seo: ISeo;
}

export function Seo({ global, seo }: SeoProps) {
  const { siteName, defaultSeo } = global;
  const mergedSeo = { ...defaultSeo, ...seo, shareImage: defaultSeo.shareImage?.data?.attributes ?? seo.shareImage?.data?.attributes };

  const formattedSeo = {
    ...mergedSeo,
    pageTitle: mergedSeo.pageTitle ? `${mergedSeo.pageTitle} :: ${siteName}` : siteName,
    shareImage: getStrapiMedia(mergedSeo.shareImage),
  };

  return (
    <Head>
      {formattedSeo.pageTitle && (
        <>
          <title>{formattedSeo.pageTitle}</title>
          <meta property="og:title" content={formattedSeo.pageTitle} />
          <meta name="twitter:title" content={formattedSeo.pageTitle} />
        </>
      )}
      {formattedSeo.metaDescription && (
        <>
          <meta name="description" content={formattedSeo.metaDescription} />
          <meta property="og:description" content={formattedSeo.metaDescription} />
          <meta name="twitter:description" content={formattedSeo.metaDescription} />
        </>
      )}
      {formattedSeo.shareImage && (
        <>
          <meta property="og:image" content={formattedSeo.shareImage} />
          <meta name="twitter:image" content={formattedSeo.shareImage} />
          <meta name="image" content={formattedSeo.shareImage} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
