import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "contexts/App";
import { theme } from "theme/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
