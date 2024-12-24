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
  const [loading, setLoading] = useState(false);

  const bookAppoint = async () => {
    setLoading(true); // Set loading to true when the process starts
    try {
      const formatTime = (dateString: string, time: string): string => {
        if (!time || typeof time !== "string") {
          throw new Error(`Invalid time value: ${time}`);
        }

        const amPmMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!amPmMatch) {
          throw new Error(`Invalid time format: ${time}`);
        }

        const [_, hours, minutes, period] = amPmMatch;
        let hour = parseInt(hours, 10);

        if (period.toUpperCase() === "PM" && hour !== 12) {
          hour += 12;
        } else if (period.toUpperCase() === "AM" && hour === 12) {
          hour = 0;
        }

        const [year, month, day] = dateString.split("T")[0].split("-");
        return `${year}-${month}-${day}T${String(hour).padStart(
          2,
          "0"
        )}:${minutes}:00.000Z`;
      };

      const startTime = formatTime(selectedDate, selectedSlot.from);
      const endTime = formatTime(selectedDate, selectedSlot.to);

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

      router.push(`/appointment/${response.data.id}`);
      console.log(response);
    } catch (error) {
      console.error("Error in booking appointment:", error.message);
    } finally {
      setLoading(false); // Set loading to false once the process completes
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Appointment Details</h1>
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
      <Button
        pattern="primary"
        className="w-full flex justify-center items-center"
        onClick={bookAppoint}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="loader" /> Booking...
          </span>
        ) : (
          "Confirm Appointment"
        )}
      </Button>
    </div>
  );
};

export default Patient;
