import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type allvisitState={
            id: number,
            visit_number: null,
            case_id: 1,
            appointmentId: null,
            doctorId: null,
          status: string,
          reason: string,
          advices: string,
          notes: string,
          favorite: false,
          pvt_notes: string,
          start_time: string,
          price: number|null,
          created_at: string,
          updated_at: string,
          diagnosis: [],
          examination: [
            ],
          follow_up: [],
          medications: [
               
            ],
          modules: [],
          referrals: [],
          services: [],
          symptoms: [],
          vitals: [
            ],
            user: {
                id: number|null,
                dob: string|null,
                email: string|null,
                phone_number: string|null,
                password: string|null,
                gender: string|null,
                fullname: string|null,
                age: number|null,
                profile_image: string|null,
                height: number|null,
                weight: number|null,
                blood_group: string|null,
                marital_status: string|null,
                occupation: string|null,
                allergies: [],
                medical_history: [],
                surgeries: [],
                medications: [],
                address_id: [],
                complete:boolean
            }
        }
    

const initialState = {
   
   value:{}

}
const allvisitSlice = createSlice({
    name: 'visit',
    initialState,
    reducers: {
        setAllVisit: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload;
        },
    },
})

export const { setAllVisit } = allvisitSlice.actions
export default allvisitSlice.reducer
