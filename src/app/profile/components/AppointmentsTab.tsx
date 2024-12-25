import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { fetchAppointments } from '@/lib/actions/AppointmentService';
import { useAppSelector } from '@/store';

type Appointment = {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  mode: string;
  status: string;
  doctor: { id: number; name: string };
  patient: { id: number; name: string; email: string };
  reason: string;
  notes: string;
};

type AppointmentResponse = {
  status: boolean;
  message: string;
  data: Appointment[];
};

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useAppSelector((state) => state.auth.user);

  const tabs = ['All', 'Upcoming', 'Pending', 'Recurring', 'Past', 'Cancelled'];

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetchAppointments(id);
        // Type assertion to ensure the response is of type AppointmentResponse
        const typedResponse = response as AppointmentResponse;

        console.log('API Response:', typedResponse); // Log the response to verify the structure
        if (typedResponse.status && Array.isArray(typedResponse.data)) {
          setAppointments(typedResponse.data);
          setFilteredAppointments(typedResponse.data); // Default to showing all appointments
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [id]);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const weekday = parsedDate.toLocaleDateString('en-US', { weekday: 'short' });
    const month = parsedDate.toLocaleDateString('en-US', { month: 'short' });

    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${(hours % 12) || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;

    return { day, weekday, month, formattedTime };
  };

  const filterAppointmentsByStatus = (status: string) => {
    if (status === 'All') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter((appointment) => appointment.status === status));
    }
  };

  const groupAppointmentsByMonth = (appointments: Appointment[]) => {
    return appointments.reduce((acc, appointment) => {
      const month = new Date(appointment.appointment_date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(appointment);
      return acc;
    }, {} as Record<string, Appointment[]>);
  };

  const renderAppointments = (groupedAppointments: Record<string, Appointment[]>) => {
    let renderedCount = 0;
    const visibleItemCount = 5;

    return Object.entries(groupedAppointments).map(([month, monthBookings]) => {
      const monthBookingsToRender = monthBookings.filter(() => {
        renderedCount++;
        return renderedCount <= visibleItemCount;
      });

      return (
        <div key={month} className="mb-8">
          <h2 className="text-lg font-medium mb-4 py-2">{month}</h2>
          <div className="space-y-4">
            {monthBookingsToRender.map((appointment) => {
              const { day, weekday, month, formattedTime } = formatDate(appointment.start_time);
              return (
                <div key={appointment.id} className="flex items-start p-4 rounded-lg border hover:shadow-sm transition-shadow">
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
                      {formattedTime}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{appointment.reason || 'Consultation'}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {appointment.mode}
                    </div>
                    <div className="text-gray-600 mt-2">Doctor: {appointment.doctor.name}</div>
                    <div className="text-gray-600 mt-2">Patient: {appointment.patient.name} ({appointment.patient.email})</div>
                    {appointment.notes && <div className="text-gray-600 mt-2">Notes: {appointment.notes}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const groupedAppointments = groupAppointmentsByMonth(filteredAppointments);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bookings</h2>
      <p className="text-gray-500">See your scheduled events from your calendar.</p>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                  selected
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`
              }
              onClick={() => filterAppointmentsByStatus(tab)}
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">{renderAppointments(groupedAppointments)}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AppointmentsTab;
