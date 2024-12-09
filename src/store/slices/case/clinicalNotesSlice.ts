import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClinicalNotesState {
  clinicalNotes: Record<string, string[]>;
}

const initialState: ClinicalNotesState = {
  clinicalNotes: {},
};

const clinicalNotesSlice = createSlice({
  name: 'clinicalNotes',
  initialState,
  reducers: {
    updateClinicalNotes(state, action: PayloadAction<{ caseId: number; clinicalNotes: string[] }>) {
      const { caseId, clinicalNotes } = action.payload;
      state.clinicalNotes = {
        ...state.clinicalNotes,
        [caseId]: clinicalNotes,
      };
    },
  },
});

export const { updateClinicalNotes } = clinicalNotesSlice.actions;
export default clinicalNotesSlice.reducer;
