import type { NextPage } from "next";
import { useCallback, useState } from "react";

import EventMng from "@/pages/components/EventMng";
import ApiTest from "./components/ApiTest";

const Home: NextPage = () => {
  return (
    <>
      {/* <ApiTest /> */}
      <EventMng />
    </>
  );
};

export default Home;
