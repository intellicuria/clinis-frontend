
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecord } from '@/store/slices/medicalRecords/medicalRecordsSlice';
import ButtonPrimary from '@/ui/Button/ButtonPrimary';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    doctor: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to a server here
    const fileUrl = file ? URL.createObjectURL(file) : undefined;
    
    dispatch(addRecord({
      id: Date.now(),
      ...formData,
      fileUrl,
      fileName: file?.name
    }));
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Add New Medical Record</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <input
              type="text"
              value={formData.doctor}
              onChange={e => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={e => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prescription</label>
            <input
              type="text"
              value={formData.prescription}
              onChange={e => setFormData(prev => ({ ...prev, prescription: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <ButtonPrimary type="submit">
              Save Record
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
