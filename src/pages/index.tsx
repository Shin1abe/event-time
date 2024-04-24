import type { NextPage } from "next";
import { useCallback, useState } from "react";

import EventMng from "@/pages/components/EventMng";

const Home: NextPage = () => {
  return (
    <>
      <EventMng />
    </>
  );
};

export default Home;
