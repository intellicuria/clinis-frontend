import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type VisitDataState = {
    value: any
}

const initialState: VisitDataState = {
    value: null,
}

const visitDataSlice = createSlice({
    name: 'visitData',
    initialState,
    reducers: {
        setVisitData: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload;
        },
    },
})

export const { setVisitData } = visitDataSlice.actions
export default visitDataSlice.reducer