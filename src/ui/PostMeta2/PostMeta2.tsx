import React, { FC } from "react";
import Avatar from "@/ui/Avatar/Avatar";
import { PostDataType } from "@/data/types";
import { DEMO_POSTS } from "@/data/posts";
import Link from "next/link";

// const metaDemo: PostMeta2Props["meta"] = DEMO_POSTS[0];

export interface PostMeta2Props {
  className?: string;
  meta: {
    date: string;
    displayname: string;
    readingTime: string;
    authorUrl: string;
  };
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { date, authorUrl, readingTime, displayname } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
      <div
        // href={author.href}
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={authorUrl}
          userName={displayname}
        />
      </div>
      <div className="ms-3">
        <div className="flex items-center">
          <div
            // href={author.href}
            className="block font-semibold"
          >
            {displayname}
          </div>

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              {/* <div className="ms-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link key={cat.id} href={cat.href} className="font-semibold">
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div> */}
            </>
          )}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">{date}</span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {readingTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
