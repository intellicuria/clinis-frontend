import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ModuleState = {
    value: string
}

const initialState: ModuleState = {
    value: '',
}

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setModule: (state, action) => {
            console.log('action.payload')
            console.log(action.payload)
            state.value = action.payload
        },
    },
})

export const { setModule } = moduleSlice.actions
export default moduleSlice.reducer
