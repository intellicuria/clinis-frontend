import React, { FC } from "react";
import WidgetAuthors from "@/ui/WidgetAuthors/WidgetAuthors";
import WidgetCategories from "@/ui/WidgetCategories/WidgetCategories";
import WidgetPosts from "@/ui/WidgetPosts/WidgetPosts";
import WidgetTags from "@/ui/WidgetTags/WidgetTags";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_POSTS } from "@/data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS } from "@/data/taxonomies";
import { PostDataType } from "@/data/types";

export interface SidebarProps {
  className?: string;
}

const widgetPosts: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);
const tags = DEMO_TAGS.filter((_, i) => i > 5);
const categories = DEMO_CATEGORIES.filter((_, i) => i > 7 && i < 13);
const authors = DEMO_AUTHORS.filter((_, i) => i < 5);

export const Sidebar: FC<SidebarProps> = ({ className = "space-y-6 " }) => {
  return (
    <div className={`nc-SingleSidebar ${className}`}>
      <WidgetTags tags={tags} />
      <WidgetCategories categories={categories} />
      <WidgetAuthors authors={authors} />
      <WidgetPosts posts={widgetPosts} />
    </div>
  );
};
