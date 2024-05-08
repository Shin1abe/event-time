import "../styles/globals.css";
import "@fontsource/poppins";
import { ThemeProvider } from "next-themes";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import RootLayout from "@/pages/components/layout";
import type { ServerRouter } from "@/server/router";
import HeaderA from "@/pages/components/HeaderA";
import { createContext, useState } from "react";

// export const EventTimeContext = createContext(null);
// const ThemeContext = createContext(null);

const App: AppType = ({ Component, pageProps }) => {
  // const [mode, setMode] = useState<string|null>("");
  const [theme, setTheme] = useState('light');

  return (
    // <ThemeProvider attribute="class" defaultTheme="light">
    // <EventTimeContext.Provider value="aa">
    // <ThemeContext.Provider value={theme}>
    <RootLayout>
      <HeaderA />
      <Component {...pageProps} />
    </RootLayout>
    // </ThemeContext.Provider>
    // </EventTimeContext.Provider>
    // </ThemeProvider>
  );
};

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: true,
})(App);
