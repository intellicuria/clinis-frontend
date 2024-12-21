"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { OrgProfile } from "./components";
import AppointmentPage from "@/app/_appointment/page";

export default function Page() {
  const params = useParams();
  const { slug } = params;
  if (!slug) {
    return <div>Loading...</div>; // Handle case when slug is undefined (optional)
  }

  return (
    <div className="grid grid-cols-12 container">
      <div className="col-span-8 overflow-y-auto scrollbar-hide">
        <OrgProfile username={slug} />{" "}
      </div>

      <div className="col-span-4">
        <AppointmentPage />
      </div>
    </div>
  );
}
