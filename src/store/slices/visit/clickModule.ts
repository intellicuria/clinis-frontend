import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ClickState = {
    clicked: boolean
}

const initialState: ClickState = {
    clicked: false,
}

const clickSlice = createSlice({
    name: 'clicked',
    initialState,
    reducers: {
        setClicked: (state, action: PayloadAction<boolean>) => {
            state.clicked = action.payload;
        },
    },
})

export const { setClicked } = clickSlice.actions
export default clickSlice.reducer;