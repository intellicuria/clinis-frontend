
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import ButtonSecondary from "@/ui/Button/ButtonSecondary";
import Calendar from "@/ui/Calendar/Calendar";
import { useAppSelector } from "@/store";
import Skeleton from "@/ui/Skeleton/Skeleton";

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

interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  duration: string;
  doctor: string;
}

interface LabReport {
  id: string;
  date: string;
  testName: string;
  result: string;
  normalRange: string;
  laboratory: string;
}

interface Vital {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
}

interface Allergy {
  id: string;
  type: string;
  severity: string;
  reaction: string;
  trigger: string;
}

export default function ProfilePage() {
  const { fullname, phone_number, id } = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating API calls with setTimeout
        setTimeout(() => {
          // Mock data - replace with actual API calls
          setAppointments([
            {
              id: "1",
              date: "2024-03-20",
              time: "10:00 AM",
              doctorName: "Dr. Smith",
              status: "Upcoming",
              type: "Regular Checkup"
            }
          ]);
          setMedicalRecords([
            {
              id: "1",
              date: "2024-03-15",
              diagnosis: "Common Cold",
              prescription: "Paracetamol",
              doctorName: "Dr. Johnson",
              notes: "Rest and hydration recommended"
            }
          ]);
          setPrescriptions([
            {
              id: "1",
              date: "2024-03-15",
              medication: "Amoxicillin",
              dosage: "500mg",
              duration: "7 days",
              doctor: "Dr. Johnson"
            }
          ]);
          setLabReports([
            {
              id: "1",
              date: "2024-03-10",
              testName: "Blood Sugar",
              result: "95 mg/dL",
              normalRange: "70-100 mg/dL",
              laboratory: "Central Lab"
            }
          ]);
          setVitals([
            {
              id: "1",
              date: "2024-03-18",
              bloodPressure: "120/80",
              heartRate: "72",
              temperature: "98.6",
              weight: "70"
            }
          ]);
          setAllergies([
            {
              id: "1",
              type: "Food",
              severity: "Moderate",
              reaction: "Rash",
              trigger: "Peanuts"
            }
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderShimmer = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
              <p className="text-sm text-gray-500">{appointment.type}</p>
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

  const renderPrescriptions = () => (
    <div className="space-y-4">
      {prescriptions.map((prescription) => (
        <div key={prescription.id} className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">Date: {prescription.date}</p>
              <p className="text-sm text-gray-600">Dr. {prescription.doctor}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Medication:</p>
                <p className="text-gray-700">{prescription.medication}</p>
              </div>
              <div>
                <p className="font-medium">Dosage:</p>
                <p className="text-gray-700">{prescription.dosage}</p>
              </div>
              <div>
                <p className="font-medium">Duration:</p>
                <p className="text-gray-700">{prescription.duration}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVitals = () => (
    <div className="space-y-4">
      {vitals.map((vital) => (
        <div key={vital.id} className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Blood Pressure:</p>
              <p className="text-gray-700">{vital.bloodPressure} mmHg</p>
            </div>
            <div>
              <p className="font-medium">Heart Rate:</p>
              <p className="text-gray-700">{vital.heartRate} bpm</p>
            </div>
            <div>
              <p className="font-medium">Temperature:</p>
              <p className="text-gray-700">{vital.temperature}°F</p>
            </div>
            <div>
              <p className="font-medium">Weight:</p>
              <p className="text-gray-700">{vital.weight} kg</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Recorded on: {vital.date}</p>
        </div>
      ))}
    </div>
  );

  const renderLabReports = () => (
    <div className="space-y-4">
      {labReports.map((report) => (
        <div key={report.id} className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">{report.testName}</p>
              <p className="text-sm text-gray-600">{report.date}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Result:</p>
                <p className="text-gray-700">{report.result}</p>
              </div>
              <div>
                <p className="font-medium">Normal Range:</p>
                <p className="text-gray-700">{report.normalRange}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Lab: {report.laboratory}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAllergies = () => (
    <div className="space-y-4">
      {allergies.map((allergy) => (
        <div key={allergy.id} className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Type:</p>
              <p className="text-gray-700">{allergy.type}</p>
            </div>
            <div>
              <p className="font-medium">Severity:</p>
              <p className="text-gray-700">{allergy.severity}</p>
            </div>
            <div>
              <p className="font-medium">Trigger:</p>
              <p className="text-gray-700">{allergy.trigger}</p>
            </div>
            <div>
              <p className="font-medium">Reaction:</p>
              <p className="text-gray-700">{allergy.reaction}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (loading) return renderShimmer();

    switch (activeTab) {
      case "appointments":
        return renderAppointments();
      case "records":
        return renderMedicalRecords();
      case "prescriptions":
        return renderPrescriptions();
      case "vitals":
        return renderVitals();
      case "reports":
        return renderLabReports();
      case "allergies":
        return renderAllergies();
      default:
        return null;
    }
  };

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
            className={`px-4 py-2 rounded-md transition-colors ${
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
        {renderTabContent()}
      </div>

      {/* Upcoming Appointments Calendar */}
      {activeTab === "appointments" && (
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
      )}
    </div>
  );
}
