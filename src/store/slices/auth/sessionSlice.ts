import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
    signedIn: boolean
    token: string | null
    isPhoneNumberVerified: boolean
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
    isPhoneNumberVerified: false,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
    },
})

export const { signInSuccess, signOutSuccess, setToken } = sessionSlice.actions
export default sessionSlice.reducer
