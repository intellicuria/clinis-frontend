"use client";

import React, { FC, useState } from "react";
import CategoryBadgeList from "@/ui/CategoryBadgeList/CategoryBadgeList";
import Link from "next/link";
import bg from "../../images/Orgbg.jpeg"
export interface DoctorsCardProps {
  className?: string;
  org: any;
  ratio?: string;
}

const OrganizationCard: FC<DoctorsCardProps> = ({
  className = "h-full",
  org,
  ratio = "aspect-w-4 aspect-h-2",
}) => {
  console.log(org);
  const {
    name,
    username,
    logo,
    description,
    website,
    contact,
    email,
    members,
  } = org;

  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href={`/org/${username}`}
      className={`nc-Card11 relative flex flex-col group rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 bg-white dark:bg-neutral-800 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Image Section */}
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-lg overflow-hidden z-10 ${ratio}`}
      >
        <img
          src={
            logo !== ""
              ? logo
              : "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }
          alt={name}
          className="absolute inset-0 object-cover w-full h-full"
        />
        {isHover && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-lg font-semibold">
            {name}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col space-y-4">
        {/* Organization Name */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white truncate">
            {name}
          </h1>
          <CategoryBadgeList
            categories={[
              {
                id: 1,
                name: members?.[0]?.role || "MEMBER",
                href: "#",
                color: "green",
                taxonomy: "role",
              },
            ]}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {description}
        </p>

        {/* Website */}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            Visit Website
          </a>
        )}

        {/* Contact */}
        <div className="text-sm text-neutral-500 space-y-1">
          <p>
            <span className="font-medium">Contact:</span> {contact}
          </p>
          {email && (
            <p>
              <span className="font-medium">Email:</span> {email.join(", ")}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-auto">
          {/* Actions */}
          <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
