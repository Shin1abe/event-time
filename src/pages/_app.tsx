import React, { useState } from 'react';
import "../styles/globals.css";
import "@fontsource/poppins";
import { ThemeProvider } from "next-themes";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import RootLayout from "@/pages/components/layout";
import type { ServerRouter } from "@/server/router";
// import HeaderA from "@/pages/components/HeaderA";
import { EtProvider } from "../providers/EtProvider";
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const App: AppType = ({ Component, pageProps }) => {

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!isFullScreen) {
      const enterFullScreen = async () => {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
        document.removeEventListener('click', enterFullScreen);
      };
      document.addEventListener('click', enterFullScreen);
      return () => {
        document.removeEventListener('click', enterFullScreen);
      };
    }
  }, [isFullScreen]);


  return (
    <div className="fixed inset-0 ">
      {!isFullScreen && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <p className="text-white text-2xl"></p>
        </div>
      )}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <RootLayout>
          <EtProvider>
            <Component {...pageProps} />
          </EtProvider>
        </RootLayout>
      </ThemeProvider>
    </div>
  );
};

export default withTRPC<ServerRouter>({
  // eslint-disable-next-line no-empty-pattern
  config({ }) {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `https://${process.env.NEXT_PUBLIC_API_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    // console.log(url)
    return { url };
  },
  ssr: true,
})(App);
