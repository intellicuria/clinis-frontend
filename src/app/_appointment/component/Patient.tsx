import Button from "@/ui/Button/Button";
import React, { useState } from "react";
import { useAppSelector } from "@/store";
import { useAppSelector as AppSelector } from "../store";
import { bookAppointment } from "@/lib/actions/BookingApiService";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const today = new Date();

  // Format day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  // Check if the date is "Today" or "Tomorrow"
  const isToday = date.toDateString() === today.toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  // Add label if applicable
  let dayLabel = "";
  if (isToday) {
    dayLabel = " (Today)";
  } else if (isTomorrow) {
    dayLabel = " (Tomorrow)";
  }

  return `${day} ${month}${dayLabel}`;
};

const Patient = () => {
  const { fullname, phone_number, id } = useAppSelector(
    (state) => state.auth.user
  );
  const { selectedSlot, selectedDoctor, selectedDate, selectedWorkspace } =
    AppSelector((state) => state.AppointmentList.data);
  const router = useRouter();

  const bookAppoint = async () => {
    console.log("Book Appointment");

    try {
      // Helper function to format time
      const formatTime = (dateString: string, time: string): string => {
        if (!time || typeof time !== "string") {
          throw new Error(`Invalid time value: ${time}`);
        }

        // Handle AM/PM format
        const amPmMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!amPmMatch) {
          throw new Error(`Invalid time format: ${time}`);
        }

        const [_, hours, minutes, period] = amPmMatch;
        let hour = parseInt(hours, 10);

        // Convert to 24-hour format
        if (period.toUpperCase() === "PM" && hour !== 12) {
          hour += 12;
        } else if (period.toUpperCase() === "AM" && hour === 12) {
          hour = 0;
        }

        // Parse the date string to extract year, month, and day
        const [year, month, day] = dateString.split("T")[0].split("-");

        // Manually construct ISO string without timezone offset
        return `${year}-${month}-${day}T${String(hour).padStart(
          2,
          "0"
        )}:${minutes}:00.000Z`;
      };

      // Validate and format start_time and end_time
      const startTime = formatTime(selectedDate, selectedSlot.from); // e.g., "2024-12-09T08:00:00.000Z"
      const endTime = formatTime(selectedDate, selectedSlot.to); // e.g., "2024-12-09T08:15:00.000Z"

      const body = {
        patient_id: id,
        doctorId: selectedDoctor.value,
        workspace_id: selectedWorkspace.value,
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
        appointment_date: selectedDate,
        reason: "",
      };
      console.log(body);
      const response = await bookAppointment(body);
      //navigate to /appointment/:appointmendId
      router.push(`/appointment/${response.data.id}`);

      console.log(response);
    } catch (error) {
      console.error("Error in booking appointment:", error.message);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Appointment Details</h1>
      {/* Appointment Details */}
      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <p className="text-sm font-medium">
          <span className="block text-gray-500">DATE & TIME</span>
          {formatDate(selectedDate)} <span className="px-1"></span>{" "}
          {selectedSlot.from} - {selectedSlot.to}
        </p>
        <p className="mt-3 text-sm font-medium">
          <span className="block text-gray-500">DOCTOR</span>
          {selectedDoctor.label}
        </p>
        <p className="mt-3 text-sm font-medium">
          <span className="block text-gray-500">CLINIC</span>
          {selectedWorkspace.label}
          <br />
          {selectedWorkspace.description}
        </p>
      </div>
      <h3 className="text-lg font-bold text-indigo-600">Patient Details</h3>
      <div className="border border-gray-200 rounded-lg p-4 mb-5 text-base">
        <h1 className="font-bold">{fullname}</h1>
        <p className="text-gray-500 mt-1">
          <b>{phone_number}</b>
        </p>
      </div>
      <Button pattern="primary" className="w-full" onClick={bookAppoint}>
        Confirm Appointment
      </Button>
    </div>
  );
};

export default Patient;
