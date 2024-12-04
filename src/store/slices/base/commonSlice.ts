import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

interface currentIDandName {
    workspace: { name: string; id: string }
    case: { name: string; id: string }
    visit: { name: string; id: string }
}

export type CommonState = {
    currentRouteKey: string
    currentIDandName: currentIDandName
}

export const initialState: CommonState = {
    currentRouteKey: '',
    currentIDandName: {
        workspace: { name: '', id: '' },
        case: { name: '', id: '' },
        visit: { name: '', id: '' },
    },
}

export const commonSlice = createSlice({
    name: `${SLICE_BASE_NAME}/common`,
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload
        },
        setCurrentWorkspaceCaseVisit: (state, action) => {
            console.log(state)
            state.currentIDandName = {
                ...state.currentIDandName,
                ...action.payload,
            }
        },
    },
})

export const { setCurrentRouteKey, setCurrentWorkspaceCaseVisit } =
    commonSlice.actions

export default commonSlice.reducer
