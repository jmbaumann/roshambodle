import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>🪨📄✂️</title>
      <meta name="description" content="RPS Daily" />
      <meta
        property="og:image"
        content="https://roshambodle.vercel.app/api/og"
      />
      <meta property="og:title" content="RPS Daily" />
      <meta property="og:description" content="RPS Daily" />
      <meta name="theme-color" content="#2d2d2d" />

      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta charSet="UTF-8" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://www.roshambodle.com" />
    </Head>
  );
}
