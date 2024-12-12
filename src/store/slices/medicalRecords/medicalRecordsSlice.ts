
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MedicalRecordsState, MedicalRecord } from './types';

const initialState: MedicalRecordsState = {
  records: [],
  viewMode: 'list',
  sortBy: 'date',
  sortOrder: 'desc',
  filterText: '',
  isLoading: false,
  error: null
};

const medicalRecordsSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<MedicalRecord[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<MedicalRecord>) => {
      state.records.push(action.payload);
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'date' | 'doctor' | 'diagnosis'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    }
  }
});

export const { 
  setRecords, 
  addRecord, 
  setViewMode, 
  setSortBy, 
  setSortOrder, 
  setFilterText 
} = medicalRecordsSlice.actions;

export default medicalRecordsSlice.reducer;
