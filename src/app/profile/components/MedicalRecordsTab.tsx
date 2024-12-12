
import React, { useState } from "react";
import Button from "@/ui/Button/ButtonPrimary";
import { ViewListIcon, ViewGridIcon } from "@heroicons/react/24/outline";

const MedicalRecordsTab = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [records, setRecords] = useState([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newRecords = Array.from(files).map(file => ({
      id: Math.random().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      date: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }));
    
    setRecords([...records, ...newRecords]);
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button
            onClick={() => setIsGridView(!isGridView)}
            className="flex items-center gap-2"
          >
            {isGridView ? <ViewListIcon className="h-5 w-5" /> : <ViewGridIcon className="h-5 w-5" />}
            {isGridView ? "List View" : "Grid View"}
          </Button>
          <label className="relative">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleUpload}
              className="hidden"
            />
            <Button disabled={uploading}>
              {uploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </div>
              ) : (
                "Upload Records"
              )}
            </Button>
          </label>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No medical records uploaded yet.</p>
          <p className="text-sm text-gray-400 mt-2">Upload your medical records to keep track of your health history.</p>
        </div>
      ) : (
        <div className={`${isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
          {records.map((record) => (
            <div
              key={record.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md
                ${isGridView ? "p-6" : "p-4 flex items-center justify-between"}`}
            >
              <div className={isGridView ? "space-y-4" : "flex items-center gap-4 flex-1"}>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{record.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {!isGridView && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {(record.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
              </div>
              <div className={`${isGridView ? "mt-4 pt-4 border-t" : ""} flex justify-end gap-2`}>
                <Button onClick={() => window.open(record.url)}>
                  View
                </Button>
                <Button
                  onClick={() => setRecords(records.filter(r => r.id !== record.id))}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsTab;
