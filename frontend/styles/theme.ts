import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

const theme = extendTheme({
  breakpoints,
  config,
  fonts: {
    body: "Baloo 2",
    heading: "Coda",
    mono: "Press Start 2P",
  },
});

export default theme;
