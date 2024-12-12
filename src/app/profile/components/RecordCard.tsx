
import React from 'react';
import { MedicalRecord } from '@/store/slices/medicalRecords/types';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface RecordCardProps {
  record: MedicalRecord;
}

const RecordCard = ({ record }: RecordCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">{record.diagnosis}</h3>
          <p className="text-sm text-gray-600">{record.doctor}</p>
          <p className="text-sm text-gray-500">{record.date}</p>
        </div>
        {record.fileUrl && (
          <a 
            href={record.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700"
          >
            <DocumentIcon className="h-5 w-5" />
          </a>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-700">{record.notes}</p>
      </div>
    </div>
  );
};

export default RecordCard;
import React from 'react';
import { MedicalRecord } from '@/store/slices/medicalRecords/types';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface RecordCardProps {
  record: MedicalRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{record.diagnosis}</h3>
          <p className="text-sm text-gray-500">{record.date}</p>
        </div>
        {record.fileUrl && (
          <a 
            href={record.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700"
          >
            <DocumentIcon className="h-6 w-6" />
          </a>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm"><span className="font-medium">Doctor:</span> {record.doctor}</p>
        <p className="text-sm"><span className="font-medium">Prescription:</span> {record.prescription}</p>
        <p className="text-sm"><span className="font-medium">Notes:</span> {record.notes}</p>
      </div>
    </div>
  );
};

export default RecordCard;
