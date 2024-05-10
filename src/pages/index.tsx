import type { NextPage } from "next";
import React, { useCallback, useState } from "react";

import EventMng from "@/pages/components/EventMng";
import ApiTest from "./components/ApiTest";

const Home: NextPage = () => {
  return (
    <React.StrictMode>
      {/* <ApiTest /> */}
      <EventMng />
    </React.StrictMode>
  );
};

export default Home;
