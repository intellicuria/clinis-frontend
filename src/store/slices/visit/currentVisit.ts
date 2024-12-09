import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VisitData } from '@/@types/visits'

export type visitState={
    
    value:VisitData
}

const value: visitState = {
    value: {
        vitals: {
            blood_pressure: '',
            body_temperature: null,
            body_weight: null,
            diastolic_bp: null,
            peripheral_oxygen_saturation: null,
            pulse: null,
            respiratory_rate: null,
            systolic_bp: null,
        },
        symptoms: [],
        diagnosis: [],
        medications: [],
        examination: [],
        advices: null,
        notes: null,
        reason: null,
        pvt_notes: null,
        referrals: [],
        modules: [],
        follow_up: {
            follow_up_on: null,
            details: null,
        },
        services: [],
        user: {
            id: null,
            dob: null,
            email: null,
            phone_number: null,
            password: null,
            gender: null,
            fullname: null,
            age: null,
            profile_image: null,
            height: null,
            weight: null,
            blood_group: null,
            marital_status: null,
            occupation: null,
            allergies: [],
            medical_history: [],
            surgeries: [],
            medications: [],
            address_id: [],
            complete: false, // assuming complete initially set to false
        },
    },
};


const initialState:visitState = {
   
   value:value.value

}
const visitSlice = createSlice({
    name: 'visit',
    initialState,
    reducers: {
        setVisit: (state, action: PayloadAction<visitState>) => {
            state.value = action.payload;
        },
    },
})

export const { setVisit } = visitSlice.actions
export default visitSlice.reducer
