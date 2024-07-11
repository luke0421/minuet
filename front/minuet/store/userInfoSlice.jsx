import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {}
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.value = action.payload
        },
        clearUserInfo: (state, action) => {
            state.value = {}
        }
    }
})

export default userInfoSlice.reducer
export const {setUserInfo, clearUserInfo} = userInfoSlice.actions