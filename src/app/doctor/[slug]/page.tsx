"use client";
import { useState } from "react";
import { DoctorProfile, Appointment, AllSlots } from "./components";

export default function Page() {
  const [showSlots, setShowSlots] = useState(false);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 overflow-y-auto scrollbar-hide p-3">
        <DoctorProfile doctorId="1" />
      </div>

      {/* Placeholder for other components */}
      <div className="col-span-4">
        <div className="h-full p-3">
          {showSlots ? (
            <AllSlots setShowSlots={setShowSlots} />
          ) : (
            <Appointment doctorId="1" setShowSlots={setShowSlots} />
          )}
        </div>
      </div>
    </div>
  );
}
