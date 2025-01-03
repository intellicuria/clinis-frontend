import { SOCIALS_2 } from "@/ui/SocialsList/SocialsList";
import { SocialType } from "@/ui/SocialsShare/SocialsShare";
import React, { FC } from "react";
import Link from "next/link";
export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = SOCIALS_2;

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <Link
        href={item.href}
        target="_blank"
        className="flex items-center text-4xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-3 rtl:space-x-reverse"
        key={index}
      >
        <div dangerouslySetInnerHTML={{ __html: item.icon || "" }}></div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
