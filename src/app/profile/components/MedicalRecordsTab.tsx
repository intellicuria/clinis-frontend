
"use client";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalRecord } from "@/store/slices/medicalRecords/types";
import { 
  setViewMode, 
  setSortBy, 
  setSortOrder, 
  setFilterText,
  addRecord 
} from "@/store/slices/medicalRecords/medicalRecordsSlice";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import { ViewListIcon, ViewGridIcon } from "@heroicons/react/24/outline";
import { RootState } from "@/store";
import RecordCard from "./RecordCard";
import RecordList from "./RecordList";
import UploadModal from "./UploadModal";

const MedicalRecordsTab = () => {
  const dispatch = useDispatch();
  const { 
    records, 
    viewMode, 
    sortBy, 
    sortOrder, 
    filterText 
  } = useSelector((state: RootState) => state.medicalRecords);
  
  const [showUploadModal, setShowUploadModal] = React.useState(false);

  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    dispatch(setViewMode(mode));
  }, [dispatch]);

  const handleSortChange = useCallback((value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as ['date' | 'doctor' | 'diagnosis', 'asc' | 'desc'];
    dispatch(setSortBy(newSortBy));
    dispatch(setSortOrder(newSortOrder));
  }, [dispatch]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterText(e.target.value));
  }, [dispatch]);

  const filteredAndSortedRecords = React.useMemo(() => {
    return records
      .filter(record => 
        record.doctor.toLowerCase().includes(filterText.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        const sortValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortValue : -sortValue;
      });
  }, [records, filterText, sortBy, sortOrder]);

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
            onClick={() => handleViewModeChange('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100' : 'bg-gray-100'}`}
          >
            <ViewListIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleViewModeChange('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100' : 'bg-gray-100'}`}
          >
            <ViewGridIcon className="h-5 w-5" />
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

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {viewMode === 'grid' ? (
          filteredAndSortedRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))
        ) : (
          <RecordList records={filteredAndSortedRecords} />
        )}
      </div>

      {filteredAndSortedRecords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No medical records found
        </div>
      )}

      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default MedicalRecordsTab;
