import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/coda/400.css";
import "@fontsource/coda/800.css";
import "@fontsource/press-start-2p/400.css";
import theme from "../styles/theme";
import "../styles/global.scss";
import { Strapi } from "../lib/strapi";
import { StrapiAttr, StrapiError, StrapiResponse } from "../types/api/rest";
import { IGlobalApp } from "../types/app";
import { getStrapiMedia } from "../utils/strapi";
import { GlobalContextProvider } from "../contexts/globalContext";

interface MyAppProps extends AppProps {
  cookies: string;
  global: StrapiAttr<IGlobalApp>;
}

function MyApp({ Component, pageProps, cookies, global }: MyAppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon.data?.attributes)} />
        <meta name="author" content={global.metaAuthor} />
      </Head>
      <GlobalContextProvider data={global}>
        <ChakraProvider theme={theme} colorModeManager={typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GlobalContextProvider>
    </>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  const global = await Strapi.get("global", {
    params: {
      populate: {
        favicon: "*",
        defaultSeo: { populate: "*" },
        header: { populate: "*" },
        footer: { populate: "*" },
      },
    },
  })
    .then((res: StrapiResponse<IGlobalApp>) => res.data.data.attributes)
    .catch((err: StrapiError) => {
      console.error(err.response?.data.error ?? err.toJSON());
      return { favicon: {}, defaultSeo: {}, header: {}, footer: {} };
    });

  return {
    ...appProps,
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: ctx.ctx.req.headers.cookie ?? "",
    global,
  };
};

export default MyApp;
