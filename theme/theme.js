import { extendTheme } from "@chakra-ui/react";

const Heading = {
  baseStyle: {
    fontWeight: "medium",
    lineHeight: "inherit",
  },
};

export const theme = extendTheme({
  config: { initialColorMode: "light" },
  components: {
    Heading,
  },
});
