
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { DoctorProfile } from "./components";
import AppointmentPage from "@/app/_appointment/page";

export default function Page() {
  const params = useParams();
  const { slug } = params;
  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 w-full overflow-y-auto scrollbar-hide">
          <DoctorProfile username={slug} />
        </div>
        <div className="lg:col-span-4 w-full">
          <AppointmentPage />
        </div>
      </div>
    </div>
  );
}
