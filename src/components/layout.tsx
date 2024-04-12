import Head from "next/head";
import React from "react";
import HeaderA from "./HeaderA";
import HeaderB from "./HeaderB";
import Footer from "./Footer";
import Parts from "./Parts";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Grocery List</title>
        <meta name="description" content="Visit www.xxxxxx.xx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed-header">
        {/* <HeaderA /> */}
        {/* <HeaderB /> */}
      </div>
      <div>
        <Parts />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
