import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div className={`nc-SectionHero relative -top-28 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center text-center lg:text-left w-full justify-evenly">
        <div className="w-screen max-w-full xl:max-w-lg space-y-3 lg:space-y-5">
          <h2 className="text-2xl !leading-tight font-semibold text-neutral-900 md:text-3xl xl:text-4xl dark:text-neutral-100">
            {heading}
          </h2>
          <span className="block text-base xl:text-lg !mt-3 text-neutral-600 dark:text-neutral-400">
            {subHeading}
          </span>
          {!!btnText && (
            <ButtonPrimary
              className="rounded-lg bg-[#0051FF]"
              href="#our-story"
            >
              {btnText}
            </ButtonPrimary>
          )}
        </div>
        <div className="flex">
          <Image
            className=" scale-95 max-h-[85vh] animate-scale-person"
            src={rightImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
