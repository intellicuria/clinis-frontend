import React, { FC } from "react";
import ButtonCircle from "@/ui/Button/ButtonCircle";
import rightImg from "@/images/doctor-newsletter.svg";
import Badge from "@/ui/Badge/Badge";
import Input from "@/ui/Input/Input";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative justify-center flex mx-auto flex-col lg:flex-row items-center ${className}`}
    >
      <div className="flex-shrink-0 mb-4 md:mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our Clinisletter</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Stay updated with the latest advancements in healthcare, AI
          technologies, and exclusive offers.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Receive exclusive insights
            </span>
          </li>
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium AI Tools
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
      </div>
      <div className="lg:w-2/5">
        <Image
          alt="subsc"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={rightImg}
        />
      </div>
    </div>
  );
};

export default SectionSubscribe;
