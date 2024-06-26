import Head from "next/head";
import React from "react";
import HeaderA from "./HeaderA";
// import HeaderB from "./HeaderB";
import Footer from "./Footer";
import { Toaster } from "@/ui/toaster";
// import { useEtContext } from "../providers/EtProvider";
// import HeaderCoordinator from "./HeaderCoordinator";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  //■  useEtContext
  // const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

  return (
    <>
      <Head>
        <title>EventTime</title>
        <meta name="description" content="Visit https://event-time.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen">
        <div className="fixed-header">
          <HeaderA />
          {/* {isCoordinator ? <HeaderCoordinator /> : null} */}
        </div>
        <div className="body-content  flex-grow mt-11">
          <Toaster />
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
