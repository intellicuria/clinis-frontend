"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAppointments } from "@/lib/actions/AppointmentService";
import { useAppSelector } from "@/store";

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
const formatTime = (timeString: string | Date): string => {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour format and determine AM/PM
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Converts 0 to 12 for midnight
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

const AppointmentConfirmation = () => {
  const params = useParams();
  const { slug } = params;
  const { fullname } = useAppSelector((state) => state.auth.user);

  if (!slug) {
    console.log("Slug is undefined");
    return <div>Loading...</div>; // Handle case when slug is undefined (optional)
  }
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch doctor details using the provided `getDoctor` function
    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchAppointments(slug);
        console.log(response);
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col space-y-20">
      {/* Header */}
      <div className="text-center mt-10">
        <div className="bg-indigo-600 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-3xl">
          ✓
        </div>
        <h1 className="text-lg font-semibold text-gray-800 mt-5 mb-2">
          Appointment Confirmed for
        </h1>
        <button className="bg-indigo-100 text-indigo-600 font-bold rounded-full py-1 px-3 cursor-default">
          {fullname}
        </button>
      </div>

      {/* Appointment Details */}
      <div className="bg-white mx-auto w-11/12 max-w-xl p-6 rounded-lg shadow-md text-center my-5">
        <h2 className="text-lg font-semibold text-indigo-600">
          {formatDate(appointments.appointment_date)}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {formatTime(appointments.start_time)} -{" "}
          {formatTime(appointments.end_time)}
        </p>
        <hr className="my-5 border-gray-200" />
        <div className="text-left">
          <h3 className="text-gray-800 font-semibold mb-2">
            {appointments.workspace?.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {appointments.workspace?.about}
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="bg-gray-100 fixed bottom-0 left-0 right-0  w-full flex justify-between items-center px-5 py-3 z-50 shadow-xl">
        <button
          className="text-indigo-600 font-bold text-base"
          onClick={() => console.log("Manage Appointment clicked")}
        >
          Manage Appointment
        </button>
        <button className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-full">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
