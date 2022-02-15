import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    body: "Baloo 2",
    heading: "Coda",
    mono: "Press Start 2P",
  },
});

export default theme;
