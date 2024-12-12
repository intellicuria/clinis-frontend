import React, { FC, useEffect } from "react";
import Logo from "@/ui/Logo/Logo";
import Navigation from "@/ui/Navigation/Navigation";
import MenuBar from "@/ui/MenuBar/MenuBar";
import Image from "next/image";
import clinisionew from "@/images/clinisiosvg.png";
import clinisionewdark from "@/images/clinisionewdark.svg";
import { useThemeMode } from "@/hooks/useThemeMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Link from "next/link";
import ArchiveFilterListBox from "@/ui/ArchiveFilterListBox/ArchiveFilterListBox";
import { useAppDispatch, useAppSelector, setLocation } from "@/store";
import { useSearchParams } from "next/navigation";

export interface MainNav1Props {}
const Location = [
  { name: "Delhi" },
  { name: "Mumbai" },
  { name: "Bengaluru" },
  { name: "Kolkata" },
  { name: "Pune" },
  { name: "Hyderabad" },
  { name: "Chennai" },
];
const MainNav1: FC<MainNav1Props> = ({}) => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode();

  const searchParams = useSearchParams();
  const locat = searchParams.get("location");

  useEffect(() => {
    if (locat) {
      dispatch(setLocation(locat));
    }
  }, [locat]);

  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.auth.user);
  const { signedIn } = useAppSelector((state) => state.auth.session);

  return (
    <div className="nc-MainNav1 select-none relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-auto min-h-[5rem] py-3 md:py-5 flex justify-between items-center gap-4">
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex justify-center lg:justify-start flex-1 items-center sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Link href={"/"}>
              <Image
                src={isDarkMode ? clinisionewdark : clinisionew}
                className="h-10 w-auto"
                alt=""
              />
            </Link>
            <Navigation className="hidden lg:flex" />
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center gap-5 lg:flex">
              <AvatarDropdown />
              <ArchiveFilterListBox
                className="h-full"
                lists={Location}
                onChange={(location: string) => dispatch(setLocation(location))}
                defaultValue={location}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
