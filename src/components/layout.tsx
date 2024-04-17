import Head from "next/head";
import React from "react";
import HeaderA from "./HeaderA";
import HeaderB from "./HeaderB";
import Footer from "./Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>EventTime</title>
        <meta name="description" content="Visit www.xxxxxx.xx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="fixed-header">
          <HeaderA />
          {/* <HeaderB /> */}
        </div>
        <div className="body-content">
          {children}
        </div>
        <div className="fixed-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
