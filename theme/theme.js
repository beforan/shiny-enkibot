import { extendTheme } from "@chakra-ui/react";

const Heading = {
  baseStyle: {
    fontWeight: "medium",
    lineHeight: "inherit",
  },
};

const layerStyles = {
  ff7: {
    borderRadius: 5,
    bgGradient: "linear(to-br, #00c, #004)",
    color: "white",
    borderColor: "gray.300",
    borderWidth: 4,
    borderStyle: "ridge",
  },
};

export const theme = extendTheme({
  config: { initialColorMode: "light" },
  layerStyles,
  components: {
    Heading,
  },
});
