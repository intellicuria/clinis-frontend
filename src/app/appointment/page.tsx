
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";
import { fetchAppointments, cancelAppointment } from "@/lib/actions/AppointmentService";

interface Appointment {
  id: string;
  doctor_name: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  workspace: {
    name: string;
    about: string;
  };
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (timeString: string): string => {
  return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments(user.id);
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadAppointments();
    }
  }, [user]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId);
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Appointments</h1>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{appointment.doctor_name}</h2>
                  <p className="text-gray-600">{appointment.workspace.name}</p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {formatDate(appointment.appointment_date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => router.push(`/appointment/${appointment.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    View Details
                  </button>
                  {appointment.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
