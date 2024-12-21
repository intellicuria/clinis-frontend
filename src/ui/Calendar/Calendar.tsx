
"use client";

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  showEvents?: boolean;
  events?: Array<{
    title: string;
    status: string;
    time: string;
    attendees?: number;
  }>;
}

const Calendar = ({
  onDateSelect,
  initialDate = new Date(),
  minDate,
  maxDate,
  className = "",
  showEvents = true,
  events = []
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    if (!minDate || newDate >= minDate) {
      setCurrentDate(newDate);
    }
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    if (!maxDate || newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === currentDate.getMonth() &&
      selectedDate?.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-gray-500 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-10 rounded-full flex items-center justify-center transition-colors
                ${isSelected(day) ? 'bg-blue-600 text-white' : 
                  isToday(day) ? 'bg-blue-100 text-blue-600' : 
                  'hover:bg-gray-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {showEvents && selectedDate && (events.length > 0 ? events : [{
        title: "Meeting Client",
        status: "Upcoming",
        time: "02:20 PM - 03:30 PM",
        attendees: 2
      }]).map((event, index) => (
        <div key={index} className="mt-6 space-y-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{event.title}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {event.status}
              </span>
            </div>
            <div className="text-gray-600">{event.time}</div>
            {event.attendees && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                </div>
                <span className="text-sm text-gray-600">+{event.attendees} People</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
