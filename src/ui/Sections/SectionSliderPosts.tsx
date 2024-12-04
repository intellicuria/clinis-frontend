"use client";

import React, { FC } from "react";
import Heading from "@/ui/Heading/Heading";
import Card4 from "@/ui/Card4/Card4";
import Card7 from "@/ui/Card7/Card7";
import { PostDataType } from "@/data/types";
import Card9 from "@/ui/Card9/Card9";
import Card10 from "@/ui/Card10/Card10";
import Card11 from "@/ui/Card11/Card11";
import Card10V2 from "@/ui/Card10/Card10V2";
import MySlider from "@/ui/MySlider";

export interface SectionSliderPostsProps {
  className?: string;
  heading: string;
  subHeading?: string;
  posts: PostDataType[];
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11";
  perView?: 2 | 3 | 4;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card4",
  perView = 4,
}) => {
  let CardComponent = Card4;

  switch (postCardName) {
    case "card4":
      CardComponent = Card4;
      break;
    case "card7":
      CardComponent = Card7;
      break;
    case "card9":
      CardComponent = Card9;
      break;
    case "card10":
      CardComponent = Card10;
      break;
    case "card10V2":
      CardComponent = Card10V2;
      break;
    case "card11":
      CardComponent = Card11;
      break;

    default:
      break;
  }

  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>

      <MySlider
        data={posts}
        renderItem={(item, indx) => <CardComponent key={indx} post={item} />}
        itemPerRow={perView}
      />
    </div>
  );
};

export default SectionSliderPosts;
