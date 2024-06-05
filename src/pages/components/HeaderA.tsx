import React, { useCallback } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        {/* <div className="container mx-auto flex justify-between items-center px-8 md:px-14 lg:px-24 w-full"> */}
        <div className="text-lg font-bold text-center">EventTime</div>
        {/* <div className="space-x-12 hidden md:flex items-center"> */}
        {/* <a
              href="#home"
              className="hover:text-selected-text transition-all duration-300"
            >
              ホーム
            </a>
            <a
              href="#portfolio"
              className="hover:text-selected-text transition-all duration-300"
            >
              ポートフォリオ
            </a>
            <a
              href="#skils"
              className="hover:text-selected-text transition-all duration-300"
            >
              スキル一覧
            </a> */}
        {/* <a href="#contact">
              <button className="px-6  py-2 bg-theme font-bold rounded-lg hover:bg-purple-600 transition-all duration-300">
                お問い合わせ
              </button>
            </a> */}
        {/* </div> */}
        {/* <div className="md:hidden">
            <FontAwesomeIcon icon={faBars} className=" h-[20px]" />
            初めてでもわかるTailwindcss入門(2) ナビゲーションバー
        https://reffect.co.jp/html/tailwind-for-beginners-navigation-menu#google_vignette
          </div> */}
        {/* </div> */}
      </header>
    </div>
  );
};

export default HeaderA;
