"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { DoctorProfile, Appointment, AllSlots } from "./components";
import BookAppointment from "./components/BookAppointment";
import AppointmentConfirmation from "./components/AppointmentConfirmation";

export default function Page() {
  const params = useParams();
  // example URL /posts/123
  const { slug } = params;
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [doctorData, setDoctorData] = useState<any>(null);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>({
    label: "– select –",
    description: "",
    value: -1,
  });
  const [showBookAppointment, setShowBookAppointment] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<any>({});

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
          {showBookAppointment ? (
            <BookAppointment />
          ) : showSlots ? (
            <AllSlots
              setShowSlots={setShowSlots}
              doctorData={doctorData}
              selectedOption={selectedOption}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              navigateToBookAppointment={setShowBookAppointment}
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
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              navigateToBookAppointment={setShowBookAppointment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
