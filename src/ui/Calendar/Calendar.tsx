
import React from 'react';

const Calendar = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span>←</span>
        </button>
        <h2 className="text-xl font-medium">September, 2024</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span>→</span>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-gray-600 text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Meeting Client</h3>
            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Starting</span>
          </div>
          <div className="text-gray-600">02:20 PM - 03:30 PM</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
            </div>
            <span className="text-sm text-gray-600">+2 People</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                3 Todo List
              </span>
              <span className="flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                70 Min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
