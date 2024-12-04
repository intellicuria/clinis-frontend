"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/ui/Header/HeaderLogged";
import Header from "@/ui/Header/Header";
import Header2 from "@/ui/Header/Header2";
import {
  ShoppingBagIcon as ShoppingCartIcon,
  Cog8ToothIcon as CogIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import SwitchDarkMode2 from "@/ui/SwitchDarkMode/SwitchDarkMode2";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  let pathname = usePathname();
  useThemeMode();
  //

  //
  // FOR OUR DEMO PAGE, use do not use this, you can delete it.
  const [headerSelected, setHeaderSelected] = useState<
    "Header 1" | "Header 2" | "Header 3"
  >("Header 1");
  const [themeDir, setThemeDIr] = useState<"rtl" | "ltr">("ltr");

  //
  useEffect(() => {
    if (themeDir === "rtl") {
      document.querySelector("html")?.setAttribute("dir", "rtl");
    } else {
      document.querySelector("html")?.removeAttribute("dir");
    }
    return () => {
      document.querySelector("html")?.removeAttribute("dir");
    };
  }, [themeDir]);

  //

  //

  const headerComponent = useMemo(() => {
    let HeadComponent = Header2;
    if (pathname === "/home-2" || headerSelected === "Header 2") {
      return <HeaderLogged />;
    }
    if (pathname === "/home-3" || headerSelected === "Header 3") {
      return <Header />;
    }

    return <Header2 />;
  }, [pathname, headerSelected]);

  return <>{headerComponent}</>;
};

export default SiteHeader;
