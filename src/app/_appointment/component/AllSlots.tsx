"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Button from "@/ui/Button/Button";
import { getSlots } from "@/lib/actions/BookingApiService";
import { useAppSelector } from "../store";
import { setSelectedSlot, setSelectedDate, useAppDispatch } from "../store";

export default function AllSlots({
  setShowSlots,
  navigateToBookAppointment,
}: {
  setShowSlots: any;
  navigateToBookAppointment: any;
}) {
  const dispatch = useAppDispatch();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState({
    dayName: today.toLocaleString("en-US", { weekday: "short" }),
    dayNumber: today.getDate(),
    date: today,
  });

  const { currentDoctor, selectedSlot, selectedWorkspace } = useAppSelector(
    (state) => state.AppointmentList.data
  );

  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!currentDoctor.id || !selectedWorkspace.value) {
        return;
      }

      const correctedDate = new Date(selectedDay.date);
      correctedDate.setHours(0, 0, 0, 0); // Set time to midnight local time
      const isoDate = correctedDate.toISOString();
      console.log(isoDate);

      try {
        setLoadingSlots(true);
        const body = { date: isoDate };
        const response = await getSlots(
          currentDoctor.id,
          selectedWorkspace.value,
          body
        );
        console.log(response);
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [currentDoctor, selectedWorkspace, selectedDay]);

  const daysContainerRef = useRef(null);

  const getDaysInMonthFromToday = (month: any, year: any) => {
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

  const handleDayClick = (day: any) => {
    console.log(day);
    setSelectedDay(day);
  };

  const daysInMonth = getDaysInMonthFromToday(
    today.getMonth(),
    today.getFullYear()
  );

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
        <h2 className="text-base font-medium uppercase">
          {loadingSlots ? "Loading Slots..." : "Available Slots"}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {slots.length > 0 ? (
            slots.map((slot: any, index: number) => (
              <Button
                sizeClass="!text-base px-2 py-2"
                key={slot.id}
                pattern={selectedSlot.id === slot.id ? "primary" : "twoTone"}
                className="rounded-sm"
                onClick={() => {
                  dispatch(setSelectedSlot(slot));
                  const correctedDate = new Date(selectedDay.date);
                  correctedDate.setHours(0, 0, 0, 0); // Set time to midnight local time
                  const isoDate = correctedDate.toISOString();
                  console.log(isoDate);

                  dispatch(setSelectedDate(isoDate));
                  navigateToBookAppointment(true);
                }}
              >
                {`${slot.from} `}
              </Button>
            ))
          ) : (
            <p className="col-span-3 text-gray-500">No slots available</p>
          )}
        </div>
      </div>
    </div>
  );
}
