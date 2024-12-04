"use client";
import React, { useEffect } from "react";
import Logo from "@/ui/Logo/Logo";
import SocialsList from "@/ui/SocialsList/SocialsList";
import { CustomLink } from "@/data/types";
import Image from "next/image";
import clinisionew from "@/images/clinisionew.svg";
import clinisionewdark from "@/images/clinisionewdark.svg";
import { useThemeMode } from "@/hooks/useThemeMode";
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Tools",
    menus: [
      { href: "/", label: "AI-Powered Tools" },
      { href: "/", label: "Predictive Analytics" },
      { href: "/", label: "Personalized Treatment" },
      { href: "/", label: "Data Visualization" },
      { href: "/", label: "Real-Time Monitoring" },
    ],
  },
  {
    id: "1",
    title: "About Us",
    menus: [
      { href: "/", label: "About Clinisio" },
      { href: "/", label: "Latest News & Updates" },
      { href: "/PrivacyPolicy", label: "Privacy Policy" },
      { href: "/termsandcondition", label: "Terms and Conditions" },
      { href: "/", label: "Contact Us" },
    ],
  },
  {
    id: "2",
    title: "Education",
    menus: [
      { href: "/", label: "AI & ML in Healthcare" },
      { href: "/", label: "Training Resources" },
      { href: "/", label: "Medical Research" },
      { href: "/", label: "Clinical Guidelines" },
      { href: "/", label: "Continuing Medical Education" },
    ],
  },
  {
    id: "4",
    title: "Team",
    menus: [
      { href: "/", label: "Join Our Team" },
      { href: "/", label: "Medical Advisors" },
      { href: "/", label: "Editorial Board" },
      { href: "/", label: "Contributing Clinicians" },
    ],
  },
];

const Footer: React.FC = () => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer mx-5 sm:mx-10 relative py-16 lg:pt-20 lg:pb-0  dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 xl:grid-cols-5 lg:gap-x-10 ">
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="flex flex-row pt-10 mt-8 border-t  pb-10 justify-between items-end gap-5">
        <div className="col-span-2 md:col-span-1">
          <Image
            src={isDarkMode ? clinisionewdark : clinisionew}
            className="h-7 sm:h-10 w-auto"
            alt=""
          />
        </div>
        <div className="sm:block hidden">
          <h5>Copyright © 2024 Clinisio</h5>
        </div>
        <SocialsList className="text-4xl dark:text-white text-black" />
      </div>
    </div>
  );
};

export default Footer;
