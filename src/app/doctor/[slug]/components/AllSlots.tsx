"use client";
import React, { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Button from "@/ui/Button/Button";

export default function AllSlots({ setShowSlots }: { setShowSlots: any }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState({
    dayName: today.toLocaleString("en-US", { weekday: "short" }),
    dayNumber: today.getDate(),
    date: today,
  });

  const daysContainerRef = useRef(null);

  // Helper function to get the days starting from today to the end of the current month
  const getDaysInMonthFromToday = (month, year) => {
    const days = [];
    const startDay =
      month === today.getMonth() && year === today.getFullYear()
        ? today.getDate()
        : 1;
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    for (let i = startDay; i <= lastDayOfMonth; i++) {
      const date = new Date(year, month, i);
      const dayName = date.toLocaleString("en-US", { weekday: "short" });
      const dayNumber = date.getDate();
      const isToday = date.toDateString() === today.toDateString();
      days.push({ dayName, dayNumber, isToday, date });
    }

    return days;
  };

  const handleNextScroll = () => {
    if (daysContainerRef.current) {
      daysContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handlePreviousScroll = () => {
    if (daysContainerRef.current) {
      daysContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const daysInMonth = getDaysInMonthFromToday(
    today.getMonth(),
    today.getFullYear()
  );
  const [timeSlots] = useState([
    "05:30 PM",
    "05:45 PM",
    "06:00 PM",
    "07:00 PM",
  ]); // Sample time slots

  return (
    <div className="mx-auto p-5 rounded-lg">
      <div className="flex flex-col gap-1 mb-5">
        <div className="flex gap-2">
          <button onClick={() => setShowSlots(false)}>
            <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
          </button>
          <h1 className="text-2xl font-semibold">MediWell Health Group</h1>
        </div>
        <p className="text-sm ml-8 text-gray-500 line-clamp-1">
          A comprehensive healthcare provider specializing in family medicine,
          preventative care, and community health outreach.
        </p>
      </div>
      <div className="flex items-center justify-between bg-white shadow-sm rounded-lg">
        {/* Left Chevron Button */}
        <button
          onClick={handlePreviousScroll}
          className="text-lg font-bold text-gray-700"
        >
          <ChevronLeftIcon className="w-8 h-8 text-gray-500" />
        </button>

        {/* Days of the current month starting from today */}
        <div
          ref={daysContainerRef}
          className="flex overflow-x-scroll mx-auto py-4 px-2 scrollbar-hide"
        >
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`flex group relative hover:bg-primary-500 min-w-16 hover:shadow-xl rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${
                day.isToday &&
                !(
                  selectedDay &&
                  selectedDay.dayNumber === day.dayNumber &&
                  selectedDay.dayName === day.dayName
                )
                  ? "bg-primary-200"
                  : ""
              } ${
                selectedDay &&
                selectedDay.dayNumber === day.dayNumber &&
                selectedDay.dayName === day.dayName
                  ? "bg-primary-500 text-white"
                  : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              {selectedDay &&
                selectedDay.dayNumber === day.dayNumber &&
                selectedDay.dayName === day.dayName && (
                  <>
                    <span className="flex h-3 w-3 absolute -top-1 -right-1">
                      <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-primary-400 "></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-100"></span>
                    </span>
                  </>
                )}

              <div className="flex items-center px-4 py-4">
                <div className="text-center">
                  <p
                    className={`text-gray-900 group-hover:text-gray-100 text-sm transition-all duration-300 ${
                      selectedDay &&
                      selectedDay.dayNumber === day.dayNumber &&
                      selectedDay.dayName === day.dayName
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {day.dayName}
                  </p>
                  <p
                    className={`text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all duration-300 ${
                      selectedDay &&
                      selectedDay.dayNumber === day.dayNumber &&
                      selectedDay.dayName === day.dayName
                        ? "text-white font-bold"
                        : ""
                    }`}
                  >
                    {day.dayNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={handleNextScroll}
          className="text-lg font-bold text-gray-700"
        >
          <ChevronRightIcon className="w-8 h-8 text-gray-500" />
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-4 rounded-lg">
        <h2 className="text-base font-medium uppercase">MORNING</h2>
        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((time, index) => (
            <Button
              sizeClass="!text-base px-2 py-2"
              key={index}
              pattern="twoTone"
              className="rounded-sm"
            >
              {time}
            </Button>
          ))}
        </div>
        <h2 className="text-base font-medium   uppercase">AFTERNOON</h2>
        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((time, index) => (
            <Button
              sizeClass="!text-base px-2 py-2"
              key={index}
              pattern="twoTone"
              className="rounded-sm"
            >
              {time}
            </Button>
          ))}
        </div>
        <Button disabled={true} pattern="primary" className="rounded-sm">
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
