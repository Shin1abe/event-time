import React from 'react';
import "../styles/globals.css";
import "@fontsource/poppins";
import { ThemeProvider } from "next-themes";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import RootLayout from "@/pages/components/layout";
import type { ServerRouter } from "@/server/router";
// import HeaderA from "@/pages/components/HeaderA";
import { EtProvider } from "../providers/EtProvider";


// eslint-disable-next-line react/prop-types
const App: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="light">
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
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    console.log(url)
    return { url };
  },
  ssr: true,
})(App);
