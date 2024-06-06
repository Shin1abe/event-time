import React, { useCallback } from "react";
import { useRouter } from 'next/router';

const HeaderA = () => {
  const router = useRouter();
  const onClickRoot = useCallback(() => {
    router.push({
      pathname: '/',
    });
  }, []);
  return (
    <div>
      <header className="py-1  bg-slate-700" onClick={onClickRoot}>
        <div className="text-lg font-bold text-center">EventTime</div>
      </header>
    </div>
  );
};

export default HeaderA;
