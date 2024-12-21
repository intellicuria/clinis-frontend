"use client";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import BookAppointment from "./component/BookAppointment";
import AppointmentConfirmation from "./component/AppointmentConfirmation";
import AllSlots from "./component/AllSlots";
import DoctorAppointment from "../doctor/[slug]/components/Appointment";
import OrgAppointment from "../org/[slug]/components/Appointment";
import { useAppSelector } from "@/store";
import Patient from "./component/Patient";

export default function AppointmentPage() {
  const params = useParams();
  const pathname = usePathname();
  const { slug } = params;
  const [showSlots, setShowSlots] = useState(false);
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const { signedIn } = useAppSelector((state) => state.auth.session);

  // Determine if the path is for a doctor or an organization
  const isDoctor = pathname.startsWith("/doctor");
  const isOrg = pathname.startsWith("/org");

  if (!slug) {
    return <div>Loading...</div>; // Handle case when slug is undefined (optional)
  }

  return (
    <div className="bg-white h-full md:ml-5 p-4 md:p-0">
      {showBookAppointment ? (
        <>{signedIn ? <Patient /> : <BookAppointment />}</>
      ) : showSlots ? (
        <AllSlots
          setShowSlots={setShowSlots}
          navigateToBookAppointment={setShowBookAppointment}
        />
      ) : isDoctor ? (
        <DoctorAppointment
          username={slug}
          setShowSlots={setShowSlots}
          navigateToBookAppointment={setShowBookAppointment}
        />
      ) : isOrg ? (
        <OrgAppointment
          username={slug}
          setShowSlots={setShowSlots}
          navigateToBookAppointment={setShowBookAppointment}
        />
      ) : (
        <div>Invalid URL</div>
      )}
    </div>
  );
}
