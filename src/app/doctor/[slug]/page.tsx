"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { DoctorProfile, Appointment, AllSlots } from "./components";

export default function Page() {
  const params = useParams();
  // example URL /posts/123
  const { slug } = params;
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>({
    label: "– select –",
    description: "",
    value: -1,
  });

  if (!slug) {
    return <div>Loading...</div>; // Handle case when slug is undefined (optional)
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 overflow-y-auto scrollbar-hide p-3">
        <DoctorProfile
          username={slug}
          doctorData={doctorData}
          setDoctorData={setDoctorData}
        />{" "}
        {/* Pass the slug as doctorId */}
      </div>

      <div className="col-span-4">
        <div className="h-full p-3">
          {showSlots ? (
            <AllSlots
              setShowSlots={setShowSlots}
              doctorData={doctorData}
              selectedOption={selectedOption}
            />
          ) : (
            <Appointment
              username={slug}
              doctorData={doctorData}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setShowSlots={setShowSlots}
              workspaces={workspaces}
              setWorkspaces={setWorkspaces}
            />
          )}
        </div>
      </div>
    </div>
  );
}
