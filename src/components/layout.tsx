import Head from "next/head";
import React from "react";
import HeaderA from "./HeaderA";
import HeaderB from "./HeaderB";
import Footer from "./Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Grocery List</title>
        <meta name="description" content="Visit www.xxxxxx.xx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderA />
      <HeaderB />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
