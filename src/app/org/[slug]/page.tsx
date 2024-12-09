"use client";
import { useState } from "react";
import { DoctorProfile, Appointment, AllSlots } from "./components";
import BookAppointment from "./components/BookAppointment";
import AppointmentConfirmation from "./components/AppointmentConfirmation";

export default function Page() {
  const [showSlots, setShowSlots] = useState(false);
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for AppointmentConfirmation

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Conditional rendering for AppointmentConfirmation */}
      {showConfirmation ? (
        <div className="col-span-12 h-full p-3">
          <AppointmentConfirmation />
        </div>
      ) : (
        <>
          {/* Doctor Profile section with a scrollbar */}
          <div
            className="col-span-8 p-3 overflow-y-auto scrollbar-hide max-h-screen"
            style={{ paddingBottom: "10vh" }}
          >
            <DoctorProfile organizationId="1" />
          </div>

          {/* Appointment/Slots/Book Appointment section */}
          <div className="col-span-4">
            <div className="h-full p-3">
              {showBookAppointment ? (
                <BookAppointment setShowConfirmation={setShowConfirmation} />
              ) : showSlots ? (
                <AllSlots
                  doctorId="3"
                  workspaceId="2"
                  setShowSlots={setShowSlots}
                  navigateToBookAppointment={setShowBookAppointment}
                />
              ) : (
                <Appointment
                  organizationId="1"
                  setShowSlots={setShowSlots}
                  navigateToBookAppointment={setShowBookAppointment}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
