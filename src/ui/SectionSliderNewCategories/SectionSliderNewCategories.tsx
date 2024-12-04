"use client";

import React, { FC } from "react";
import Heading from "@/ui/Heading/Heading";
import { TaxonomyType } from "@/data/types";
import CardCategory3 from "@/ui/CardCategory3/CardCategory3";
import CardCategory4 from "@/ui/CardCategory4/CardCategory4";
import CardCategory1 from "@/ui/CardCategory1/CardCategory1";
import CardCategory2 from "@/ui/CardCategory2/CardCategory2";
import CardCategory5 from "@/ui/CardCategory5/CardCategory5";
import MySlider from "../MySlider";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  heading: string;
  subHeading: string;
  categories: TaxonomyType[];
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading,
  subHeading,
  className = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
}) => {
  const renderCard = (item: TaxonomyType, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined;
    switch (categoryCardType) {
      case "card1":
        return <CardCategory1 key={index} taxonomy={item} />;
      case "card2":
        return <CardCategory2 key={index} index={topIndex} taxonomy={item} />;
      case "card3":
        return <CardCategory3 key={index} taxonomy={item} />;
      case "card4":
        return <CardCategory4 key={index} index={topIndex} taxonomy={item} />;
      case "card5":
        return <CardCategory5 key={index} taxonomy={item} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading}>{heading}</Heading>
      <MySlider
        data={categories}
        renderItem={(item, indx) => renderCard(item, indx)}
        itemPerRow={itemPerRow}
      />
    </div>
  );
};

export default SectionSliderNewCategories;
