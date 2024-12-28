"use client";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalRecord } from "@/store/slices/medicalRecords/types";
import {
  setViewMode,
  setSortBy,
  setSortOrder,
  setFilterText,
  addRecord,
} from "@/store/slices/medicalRecords/medicalRecordsSlice";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import { RootState } from "@/store";
import RecordCard from "./RecordCard";
import RecordList from "./RecordList";
import UploadModal from "./UploadModal";

const MedicalRecordsTab = () => {
  const dispatch = useDispatch();
  const { viewMode, sortBy, sortOrder, filterText } = useSelector(
    (state: RootState) => state.medicalRecords
  );

  const [showUploadModal, setShowUploadModal] = React.useState(false);

  // Dummy data for testing
  const records: MedicalRecord[] = [
    {
      id: "1",
      type: "X-Ray",
      title: "Chest X-Ray Report",
      createdOn: "2024-12-10",
      doctor: "Dr. John Doe",
      diagnosis: "Pneumonia",
      prescription: "Antibiotics",
      notes: "Follow up in 2 weeks",
      file: "xray_report.pdf",
    },
    {
      id: "2",
      type: "Blood Test",
      title: "CBC Test Report",
      createdOn: "2024-12-12",
      doctor: "Dr. Jane Smith",
      diagnosis: "Anemia",
      prescription: "Iron supplements",
      notes: "Increase iron intake",
      file: "blood_test_report.pdf",
    },
    {
      id: "3",
      type: "MRI",
      title: "MRI Brain Report",
      createdOn: "2024-12-15",
      doctor: "Dr. Richard Lee",
      diagnosis: "Migraines",
      prescription: "Pain relievers",
      notes: "Continue medication as prescribed",
      file: "mri_report.pdf",
    },
    {
      id: "4",
      type: "CT Scan",
      title: "Abdominal CT Scan Report",
      createdOn: "2024-12-20",
      doctor: "Dr. Maria Davis",
      diagnosis: "Appendicitis",
      prescription: "Surgery recommended",
      notes: "Urgent surgery required",
      file: "ct_scan_report.pdf",
    },
  ];

  const handleViewModeChange = useCallback(
    (mode: "grid" | "list") => {
      dispatch(setViewMode(mode));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const [newSortBy, newSortOrder] = value.split("-") as [
        "date" | "doctor" | "diagnosis",
        "asc" | "desc"
      ];
      dispatch(setSortBy(newSortBy));
      dispatch(setSortOrder(newSortOrder));
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilterText(e.target.value));
    },
    [dispatch]
  );

  const filteredAndSortedRecords = React.useMemo(() => {
    return records
      .filter(
        (record) =>
          record.doctor.toLowerCase().includes(filterText.toLowerCase()) ||
          record.diagnosis.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        const sortValue = sortOrder === "asc" ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortValue : -sortValue;
      });
  }, [records, filterText, sortBy, sortOrder]);

  const loading = false; // Example: replace with actual loading state
  const attachments = records; // Assuming "records" are the attachments

  const LoaderSkeleton = () => (
    <tr>
      <td colSpan={6} className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </td>
    </tr>
  );

  const GridRow = ({ attachment }: { attachment: MedicalRecord }) => (
    <tr className="hover:bg-gray-100">
      <td className="px-5 py-3">{attachment.createdOn}</td>
      <td className="px-5 py-3">{attachment.doctor}</td>
      <td className="px-5 py-3">{attachment.diagnosis}</td>
      <td className="px-5 py-3">{attachment.prescription}</td>
      <td className="px-5 py-3">{attachment.notes}</td>
      <td className="px-5 py-3">
        <a href={`/files/${attachment.file}`} className="text-blue-500">
          View
        </a>
      </td>
    </tr>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAndSortedRecords.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </div>
  );

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Doctor</th>
            <th className="px-5 py-3">Diagnosis</th>
            <th className="px-5 py-3">Prescription</th>
            <th className="px-5 py-3">Notes</th>
            <th className="px-5 py-3">File</th>
          </tr>
        </thead>
        <tbody className="text-gray-500 w-full">
          {loading && (
            <>
              {[...Array(4)].map((_, index) => (
                <LoaderSkeleton key={index} />
              ))}
            </>
          )}
          {Array.isArray(attachments) &&
            attachments.length > 0 &&
            !loading &&
            filteredAndSortedRecords.map((record) => (
              <GridRow key={record.id} attachment={record} />
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Medical Records</h2>
        <ButtonPrimary onClick={() => setShowUploadModal(true)}>
          Add New Record
        </ButtonPrimary>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg">
        <div className="flex gap-2">
          <button
            onClick={() => handleViewModeChange("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-primary-100" : "bg-gray-100"
            }`}
          >
            List
          </button>
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-primary-100" : "bg-gray-100"
            }`}
          >
            Grid
          </button>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Filter records..."
            className="px-4 py-2 border rounded-lg"
            value={filterText}
            onChange={handleFilterChange}
          />

          <select
            className="px-4 py-2 border rounded-lg"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="doctor-asc">Doctor (A-Z)</option>
            <option value="doctor-desc">Doctor (Z-A)</option>
            <option value="diagnosis-asc">Diagnosis (A-Z)</option>
            <option value="diagnosis-desc">Diagnosis (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        {viewMode === "grid" ? <GridView /> : <ListView />}
      </div>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
};

export default MedicalRecordsTab;
