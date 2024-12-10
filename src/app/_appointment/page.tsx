"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import BookAppointment from "./component/BookAppointment";
import AppointmentConfirmation from "./component/AppointmentConfirmation";
import AllSlots from "./component/AllSlots";
import Appointment from "./component/Appointment";
import { useAppSelector } from "@/store";
import Patient from "./component/Patient";

export default function AppointmentPage() {
  const params = useParams();
  // example URL /posts/123
  const { slug } = params;
  const [showSlots, setShowSlots] = useState(false);
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const { signedIn } = useAppSelector((state) => state.auth.session);

  if (!slug) {
    return <div>Loading...</div>; // Handle case when slug is undefined (optional)
  }

  return (
    <div className="bg-white h-full ml-5">
      {showBookAppointment ? (
        <>{signedIn ? <Patient /> : <BookAppointment />}</>
      ) : showSlots ? (
        <AllSlots
          setShowSlots={setShowSlots}
          navigateToBookAppointment={setShowBookAppointment}
        />
      ) : (
        <Appointment
          username={slug}
          setShowSlots={setShowSlots}
          navigateToBookAppointment={setShowBookAppointment}
        />
      )}
    </div>
  );
}
