import React, { FC } from "react";
import NcImage from "@/ui/NcImage/NcImage";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
export interface CardCategory1Props {
  className?: string;
  taxonomy: { label?: string; value?: string };
  size?: "large" | "normal";
  onClick?: () => void;
}
// router.push(`/modules?search=${query}`);

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  taxonomy,
  onClick,
}) => {
  const { label } = taxonomy;
  return (
    <Link
      onClick={onClick}
      href={`/modules?category=${label}`}
      className={`nc-CardCategory1 group border-neutral-200 hover:border-primary-300 hover:ring hover:ring-primary-200/50 bg-white dark:border-neutral-500 dark:hover:ring-primary-500/30 dark:bg-neutral-900 flex justify-center items-center ${className}`}
    >
      <h2
        className={`${
          size === "large" ? "text-lg" : "text-base"
        }  text-sm sm:text-base    p-1  font-medium sm:font-semibold`}
      >
        {label}
      </h2>
    </Link>
  );
};

export default CardCategory1;
