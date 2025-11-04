// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { inter, playfair } from "@/lib/fonts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it" className={`theme-light ${inter.variable} ${playfair.variable}`}>
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#C9A86E" />
          <meta name="msapplication-TileColor" content="#ffffff" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
