import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createUser: {
        email: '',
        password: '',
        name: '',
        gender: '',
        birthdate: '',
    }
}

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        setCreateUserEmail: (state, action) => {
            state.createUser.email = action.payload
        },
        setCreateUserPassword: (state, action) => {
            state.createUser.password = action.payload
        },
        setCreateUserDetails: (state, action) => {
            state.createUser.name = action.payload.name
            state.createUser.gender = action.payload.gender
            state.createUser.birthdate = action.payload.birthdate
        },
        clearCreateUser: (state, action) => {
            state.createUser = {}
        }
    }
})

export default createUserSlice.reducer
export const {setCreateUserEmail, setCreateUserPassword, setCreateUserDetails, clearCreateUser} = createUserSlice.actions