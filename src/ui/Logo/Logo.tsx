import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import clinisionew from "@/images/clinisionew.svg";
import Image from "next/image";
import { useThemeMode } from "@/hooks/useThemeMode";
import clinisionewdark from "@/images/clinisionewdark.svg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = clinisionew,
  imgLight = clinisionew,
}) => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();

  return (
    <Link
      href="/"
      className="ttnc-logo inline-block text-primary-600 flex-shrink-0"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <Image
        src={isDarkMode ? clinisionewdark : clinisionew}
        className="h-10 w-auto"
        alt=""
      />
      {/* <LogoSvg /> */}
    </Link>
  );
};

export default Logo;
