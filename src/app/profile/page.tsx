
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import ButtonSecondary from "@/ui/Button/ButtonSecondary";
import Calendar from "@/ui/Calendar/Calendar";
import { useAppSelector } from "@/store";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  status: string;
  type: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctorName: string;
  notes: string;
}

export default function ProfilePage() {
  const { fullname, phone_number, id } = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch appointments and medical records here
        // Example API calls:
        // const appointmentsData = await getPatientAppointments(id);
        // const recordsData = await getPatientMedicalRecords(id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const renderAppointments = () => (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{appointment.doctorName}</p>
              <p className="text-sm text-gray-600">
                {appointment.date} at {appointment.time}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              appointment.status === "Upcoming" 
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="space-y-4">
      {medicalRecords.map((record) => (
        <div key={record.id} className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">Date: {record.date}</p>
              <p className="text-sm text-gray-600">Dr. {record.doctorName}</p>
            </div>
            <div>
              <p className="font-medium">Diagnosis:</p>
              <p className="text-gray-700">{record.diagnosis}</p>
            </div>
            <div>
              <p className="font-medium">Prescription:</p>
              <p className="text-gray-700">{record.prescription}</p>
            </div>
            <div>
              <p className="font-medium">Notes:</p>
              <p className="text-gray-700">{record.notes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24">
            <Image
              src="/images/avatar.svg"
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold">{fullname}</h1>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                Patient ID: {id}
              </span>
            </div>
            <div className="flex gap-3">
              <ButtonPrimary onClick={() => window.location.href = '/profile/edit'}>Edit Profile</ButtonPrimary>
              <ButtonSecondary>Download Records</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "appointments", label: "Appointments" },
          { id: "records", label: "Medical Records" },
          { id: "prescriptions", label: "Prescriptions" },
          { id: "vitals", label: "Vitals" },
          { id: "reports", label: "Lab Reports" },
          { id: "allergies", label: "Allergies" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        {activeTab === "appointments" && renderAppointments()}
        {activeTab === "records" && renderMedicalRecords()}
        {/* Add other tab content components here */}
      </div>

      {/* Upcoming Appointments Calendar */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <Calendar
          onDateSelect={(date) => console.log(date)}
          initialDate={new Date()}
          showEvents={true}
          events={appointments.map(apt => ({
            title: `Dr. ${apt.doctorName}`,
            status: apt.status,
            time: apt.time,
            attendees: 2,
          }))}
        />
      </div>
    </div>
  );
}
