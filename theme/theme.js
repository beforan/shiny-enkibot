import { extendTheme } from "@chakra-ui/react";

const global = {
  body: { textShadow: "1px 1px #000" },
  ul: { paddingLeft: "2em" },
};

const Heading = {
  baseStyle: {
    fontWeight: "medium",
    lineHeight: "inherit",
  },
};

const Link = {
  baseStyle: {
    color: "cyan.200",
    fontWeight: "bold",
  },
};

const gradients = {
  ff7blue: "linear(to-br, #00c, #004)",
};

const shadows = {
  appbar: "0 2px 10px 0 rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.5)",
};

const layerStyles = {
  ff7: {
    borderRadius: 5,
    bgGradient: gradients.ff7blue,
    color: "white",
    borderColor: "gray.300",
    borderWidth: 4,
    borderStyle: "ridge",
  },
};

export const theme = extendTheme({
  config: { initialColorMode: "dark" },
  styles: {
    global,
  },
  layerStyles,
  shadows,
  components: {
    Heading,
    Link,
  },
  gradients,
});
