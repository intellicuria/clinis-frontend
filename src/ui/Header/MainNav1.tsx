import React, { FC } from "react";
import Logo from "@/ui/Logo/Logo";
import Navigation from "@/ui/Navigation/Navigation";
import MenuBar from "@/ui/MenuBar/MenuBar";
import SwitchDarkMode from "@/ui/SwitchDarkMode/SwitchDarkMode";
import SearchModal from "../../components/search/SearchModal";
import Button from "../Button/Button";
import Image from "next/image";
import clinisionew from "@/images/clinisiosvg.png";
import clinisionewdark from "@/images/clinisionewdark.svg";
import { useThemeMode } from "@/hooks/useThemeMode";

export interface MainNav1Props {}

const MainNav1: FC<MainNav1Props> = ({}) => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();

  return (
    <div className="nc-MainNav1 select-none relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex justify-center lg:justify-start flex-1 items-center sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Image
              src={isDarkMode ? clinisionewdark : clinisionew}
              className="h-10 w-auto"
              alt=""
            />
            {/* <Logo /> */}
            <Navigation className="hidden lg:flex" />
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              {/* <SwitchDarkMode /> */}
              <SearchModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
