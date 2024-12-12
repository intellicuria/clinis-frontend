
import React from 'react';
import { MedicalRecord } from '@/store/slices/medicalRecords/types';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface RecordListProps {
  records: MedicalRecord[];
}

const RecordList = ({ records }: RecordListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
import React from 'react';
import { MedicalRecord } from '@/store/slices/medicalRecords/types';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface RecordListProps {
  records: MedicalRecord[];
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
