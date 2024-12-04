import React, { FC } from "react";
import Avatar from "@/ui/Avatar/Avatar";
import { PostDataType } from "@/data/types";
import { BlogAuthor } from "@/types/blogs.types";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

export interface PostCardMetaProps {
  className?: string;
  meta: { author: BlogAuthor; date: string };
  hiddenAvatar?: boolean;
  avatarSize?: string;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none text-xs",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
}) => {
  const { date, author } = meta;
  const formattedData = formatDate(date);
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div
        // href={"author.link"}
        className="relative flex items-center space-x-2 rtl:space-x-reverse"
      >
        {/* {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={avatarSize}
            imgUrl={author.avatar_urls[24]}
            userName={author.name}
          />
        )} */}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {author.name}
        </span>
      </div>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
          {formattedData}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
