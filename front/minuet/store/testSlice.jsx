import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        changeValue: (state, action) => {
            state.value = !state.value
        }
    }
})

export default testSlice.reducer
export const {changeValue} = testSlice.actions