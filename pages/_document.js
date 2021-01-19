// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Main, Head, NextScript } from "next/document";
import { theme } from "theme/theme";

class Document extends NextDocument {
  static getInitialProps(ctx) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
