import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import { IGlobalApp } from "../types/app";
import { IPageContext } from "../types/page";
import { getStrapiMedia } from "../utils/strapi";
import { Footer } from "./elements/Layout/Footer";
import { Navbar } from "./elements/Layout/Navbar";
import { Sidebar } from "./elements/Layout/Sidebar";

interface LayoutProps {
  global: IGlobalApp;
  pageContext: IPageContext;
  children: ReactNode;
}

export function Layout({ global, pageContext, children }: LayoutProps) {
  const { siteName, navbar, footer } = global;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon.data?.attributes)} />
        <meta name="author" content={global.metaAuthor} />
      </Head>
      <Flex direction="column" align="stretch" minH="100vh" w="full" maxW="container.md" mx="auto">
        <Navbar navbar={navbar} siteName={siteName} pageContext={pageContext} />
        <Flex as="main" flex="1" align="stretch">
          {children}
        </Flex>
        <Footer footer={footer} />
        <Sidebar navbar={navbar} siteName={siteName} />
      </Flex>
    </>
  );
}
