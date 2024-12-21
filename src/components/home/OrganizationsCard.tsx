"use client";

import React, { FC, useState } from "react";
import CategoryBadgeList from "@/ui/CategoryBadgeList/CategoryBadgeList";
import Link from "next/link";

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
      className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Image Section */}
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <img
          src={
            logo !== ""
              ? logo
              : "https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }
          alt={name}
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col space-y-3">
        {/* Organization Name */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold line-clamp-2" title={name}>
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
        <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
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
        <div className="text-sm text-neutral-500">
          <p>Contact: {contact}</p>
          {email && <p>Email: {email.join(", ")}</p>}
        </div>

        <div className="flex justify-between items-center mt-auto">
          {/* Actions */}
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
