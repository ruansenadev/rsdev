import { GetStaticProps } from "next";
import Image from "next/image";
import { Seo } from "../components/Seo";
import { Strapi } from "../lib/strapi";
import styles from "../styles/Home.module.css";
import { StrapiEntryAttr, StrapiError, StrapiResponse } from "../types/api/rest";
import { IHomePage } from "../types/page";

interface HomeProps {
  page: StrapiEntryAttr<IHomePage>;
}

export default function Home({ page }: HomeProps) {
  return (
    <div className={styles.container}>
      <Seo seo={page.seo} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = await Strapi.get("homepage", {
    params: {
      populate: {
        seo: { populate: "*" },
      },
    },
  })
    .then((res: StrapiResponse<IHomePage>) => res.data.data.attributes)
    .catch((err: StrapiError) => console.error(err.response?.data.error ?? err));

  return {
    props: { page: page ?? {} },
    revalidate: 1,
  };
};
