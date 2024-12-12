
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

type Appointment = {
  id: string;
  date: Date;
  time: string;
  title: string;
  location: string;
  participants: string[];
  status: 'upcoming' | 'pending' | 'recurring' | 'past' | 'cancelled';
};

const AppointmentsTab = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: new Date(2024, 3, 28),
      time: '09:00 - 09:30',
      title: '30min call meeting Peer <> Leslie',
      location: 'Online',
      participants: ['Dr. Peer', 'Leslie'],
      status: 'upcoming'
    },
    {
      id: '2',
      date: new Date(2024, 3, 30),
      time: '15:20 - 16:20',
      title: 'Livn Product Demo',
      location: 'Wework Paris',
      participants: ['Team A', 'Team B'],
      status: 'upcoming'
    },
  ]);

  const tabs = ['Upcoming', 'Pending', 'Recurring', 'Past', 'Cancelled'];

  const filteredAppointments = appointments.filter(
    app => app.status === selectedTab.toLowerCase()
  );

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, weekday, month };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <p className="text-gray-500">See your scheduled events from your calendar events links.</p>
      </div>

      <div className="bg-white rounded-lg p-4">
        <Tab.Group onChange={(index) => setSelectedTab(tabs[index].toLowerCase())}>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected 
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-500 hover:text-primary-600'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {tabs.map((tab) => (
              <Tab.Panel key={tab} className="space-y-4">
                {filteredAppointments.map((appointment) => {
                  const { day, weekday, month } = formatDate(appointment.date);
                  return (
                    <div key={appointment.id} className="flex items-start border rounded-lg p-4">
                      <div className="text-center mr-6">
                        <div className="text-gray-600">{weekday}</div>
                        <div className="text-3xl font-bold text-primary-500">{day}</div>
                        <div className="text-gray-600">{month}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {appointment.time}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{appointment.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {appointment.location}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AppointmentsTab;
