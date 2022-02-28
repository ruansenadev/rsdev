import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  breakpoints: {
    // base: "0em",
    sm: "480px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    "2xl": "1536px",
  },
  config,
  fonts: {
    body: "Baloo 2",
    heading: "Coda",
    mono: "Press Start 2P",
  },
});

export default theme;
