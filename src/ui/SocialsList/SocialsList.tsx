import { SocialType, SOCIALS_DATA } from "@/ui/SocialsShare/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = SOCIALS_DATA;

export const SOCIALS_2 = socialsDemo;

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav className={`nc-SocialsList flex space-x-5 ${className}`}>
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <div dangerouslySetInnerHTML={{ __html: item.icon || "" }}></div>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
