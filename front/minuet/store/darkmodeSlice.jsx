import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true
}


const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
        setdarkmode: (state, action) => {
            state.value = !state.value
        },
    }
})

export default darkmodeSlice.reducer
export const {setdarkmode} = darkmodeSlice.actions