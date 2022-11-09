import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token; 
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
        }
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;