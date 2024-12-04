import React, { FC } from "react";
import { PostAuthorType } from "@/data/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Avatar from "@/ui/Avatar/Avatar";
import NcImage from "@/ui/NcImage/NcImage";
import Link from "next/link";

export interface CardAuthorBox3Props {
  className?: string;
  author: PostAuthorType;
}

const CardAuthorBox3: FC<CardAuthorBox3Props> = ({
  className = "",
  author,
}) => {
  const { displayName, href = "/", avatar, jobName, count, bgImage } = author;
  return (
    <Link
      href={href}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl ${className}`}
    >
      <div className="h-20 flex-shrink-0 ">
        <div className="absolute top-3 inset-x-3 flex">
          <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            {count}{" "}
            <ArrowRightIcon className="w-5 h-5 text-yellow-600 ms-3 rtl:rotate-180" />
          </div>
        </div>
      </div>

      <div className="-mt-8 m-8 text-center">
        <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
          imgUrl={avatar}
          userName={displayName}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{displayName}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            @{jobName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardAuthorBox3;
