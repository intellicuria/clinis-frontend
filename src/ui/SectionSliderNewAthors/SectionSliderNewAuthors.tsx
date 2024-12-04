"use client";

import React, { FC } from "react";
import Heading from "@/ui/Heading/Heading";
import { PostAuthorType } from "@/data/types";
import MySlider from "@/ui/MySlider";
import CardAuthorBox3 from "../CardAuthorBox3/CardAuthorBox3";

export interface SectionSliderNewAuthorsProps {
  className?: string;
  heading: string;
  subHeading: string;
  authors: PostAuthorType[];
  itemPerRow?: number;
}

const SectionSliderNewAuthors: FC<SectionSliderNewAuthorsProps> = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular places to recommends for you",
  className = "",
  authors,
  itemPerRow = 5,
}) => {
  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>
      <MySlider
        itemPerRow={itemPerRow}
        data={authors}
        renderItem={(item, index) => (
          <CardAuthorBox3 key={index} author={item} />
        )}
      />
    </div>
  );
};

export default SectionSliderNewAuthors;
