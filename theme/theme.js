import { extendTheme } from "@chakra-ui/react";

const Heading = {
  baseStyle: {
    fontWeight: "medium",
    lineHeight: "inherit",
  },
};

export const theme = extendTheme({
  components: {
    Heading,
  },
});
