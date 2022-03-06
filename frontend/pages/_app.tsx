import App, { AppContext, AppProps } from "next/app";
import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/coda/400.css";
import "@fontsource/coda/800.css";
import "@fontsource/press-start-2p/400.css";
import theme from "../styles/theme";
import "../styles/global.scss";
import { SidebarProvider } from "../contexts/SidebarContext";

interface MyAppProps extends AppProps {
  cookies: string;
}

function MyApp({ Component, pageProps, cookies }: MyAppProps) {
  return (
    <>
      <ChakraProvider theme={theme} colorModeManager={typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>
    </>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  return {
    ...appProps,
    cookies: ctx.ctx.req.headers.cookie ?? "",
  };
};

export default MyApp;
