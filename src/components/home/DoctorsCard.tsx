import React, { FC } from "react";
import { PostAuthorType } from "@/data/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Avatar from "@/ui/Avatar/Avatar";
import NcImage from "@/ui/NcImage/NcImage";
import Link from "next/link";

export interface CardAuthorBox2Props {
  className?: string;
  doctor: any;
}

const OrganizationsCard: FC<CardAuthorBox2Props> = ({
  className = "",
  doctor,
}) => {
  const {
    name,
    image,
    experience_year,
    speciality,
    consultation_fee,
    user_name,
    designation,
  } = doctor;
  return (
    <Link
      href={`/doctor/${user_name}`}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl ${className}`}
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            alt="author"
            containerClassName="flex aspect-w-7 aspect-h-5 w-full h-0"
            src="https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            fill
            sizes="(max-width: 600px) 480px, 33vw"
          />
        </div>
        <div className="absolute top-3 inset-x-3 flex">
          <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            {10}{" "}
            <ArrowRightIcon className="w-5 h-5 text-yellow-600 ms-3 rtl:rotate-180" />
          </div>
        </div>
      </div>

      <div className="-mt-8 m-8 text-center">
        <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
          imgUrl={image}
          userName={name}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{name}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            @{user_name ? user_name : "-"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationsCard;
