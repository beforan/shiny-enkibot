import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "contexts/App";
import Head from "next/head";
import { theme } from "theme/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
