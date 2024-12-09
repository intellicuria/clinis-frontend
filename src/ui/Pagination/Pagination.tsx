import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages = 0,
  onPageChange,
  className = "",
}) => {
  const generatePageLinks = () => {
    const pageLinks: CustomLink[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push({
        label: i.toString(),
        href: `?page=${i}`,
      });
    }

    return pageLinks;
  };

  const renderItem = (pag: CustomLink, index: number) => {
    const isActive = currentPage === index + 1; // Check if this page is active
    return isActive ? (
      // Return active pagination
      <span
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-600 text-white ${twFocusClass()}`}
      >
        {pag.label}
      </span>
    ) : (
      // Return inactive pagination
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        href={pag.href}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(index + 1); // Change page on click
        }}
      >
        {pag.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 rtl:space-x-reverse text-base font-medium ${className}`}
    >
      {generatePageLinks().map(renderItem)}
    </nav>
  );
};

export default Pagination;
