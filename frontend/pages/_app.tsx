import App, { AppContext, AppProps } from "next/app";
import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import "../styles/global.scss";
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/coda/400.css";
import "@fontsource/coda/800.css";
import "@fontsource/press-start-2p/400.css";
import theme from "../styles/theme";

interface MyAppProps extends AppProps {
  cookies: string;
}

function MyApp({ Component, pageProps, cookies }: MyAppProps) {
  return (
    <ChakraProvider theme={theme} colorModeManager={typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return {
    ...appProps,
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: ctx.ctx.req.headers.cookie ?? "",
  };
};

export default MyApp;
