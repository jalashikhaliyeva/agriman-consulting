import { Html, Head, Main, NextScript } from "next/document";
import React from "react";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/logo/logo-favicon-agriman.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
