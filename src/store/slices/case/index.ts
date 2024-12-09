import { combineReducers } from '@reduxjs/toolkit'
import clinicalNotes, { ClinicalNotesState } from './clinicalNotesSlice';

const reducer = combineReducers({
    clinicalNotes
})

export * from './clinicalNotesSlice'

export default reducer