import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Strapi } from "../lib/strapi";
import { StrapiAttr, StrapiError, StrapiResponse } from "../types/api/rest";
import { IHomePage } from "../types/page";
import { Sections } from "../components/Sections";

interface HomeProps extends StrapiAttr<IHomePage> {}

export default function Home({ seo, contentSections: sections }: HomeProps) {
  return (
    <Layout>
      {/* Add meta tags for SEO*/}
      <Seo seo={seo} />

      {/* Display content sections */}
      <Sections sections={sections} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = await Strapi.get("homepage", {
    params: {
      populate: ["seo", "seo.shareImage", "contentSections", "contentSections.cards", "contentSections.cards.button"],
    },
  })
    .then((res: StrapiResponse<IHomePage>) => res.data.data.attributes)
    .catch((err: StrapiError) => {
      console.error(err.response?.data.error ?? err.toJSON());
      return { seo: {}, contentSections: [] };
    });

  return {
    props: { ...page },
    revalidate: 60 * 5,
  };
};
