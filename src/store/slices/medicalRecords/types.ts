
export interface MedicalRecord {
  id: number;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  fileUrl?: string;
  fileName?: string;
}

export interface MedicalRecordsState {
  records: MedicalRecord[];
  viewMode: 'grid' | 'list';
  sortBy: 'date' | 'doctor' | 'diagnosis';
  sortOrder: 'asc' | 'desc';
  filterText: string;
  isLoading: boolean;
  error: string | null;
}
