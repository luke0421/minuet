import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ""
}

const userpositionSlice = createSlice({
    name: 'userposition', // 이 부분을 'userposition'으로 수정합니다.
    initialState,
    reducers: {
        setuserposition: (state, action) => {
            state.value = action.payload;
            // console.log(action.payload)
        },
    }
})

export default userpositionSlice.reducer;
export const { setuserposition } = userpositionSlice.actions; // 이 부분을 setuserposition으로 수정합니다.
