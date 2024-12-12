
"use client";

import React from "react";
import { useState } from "react";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";

interface MedicalRecord {
  id: number;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

const MedicalRecordsTab = () => {
  const [records] = useState<MedicalRecord[]>([
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Sarah Smith",
      diagnosis: "Common Cold",
      prescription: "Paracetamol 500mg",
      notes: "Rest and hydration recommended"
    },
    {
      id: 2,
      date: "2023-12-20",
      doctor: "Dr. John Doe",
      diagnosis: "Annual Checkup",
      prescription: "Vitamins",
      notes: "All vitals normal"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Medical Records</h2>
        <ButtonPrimary>Add New Record</ButtonPrimary>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.diagnosis}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.prescription}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {records.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No medical records found
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsTab;
