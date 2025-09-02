import { createSlice} from "@reduxjs/toolkit";
 
const initialState = {
    name: null,
    email: null,
    verifyCode: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        storeUser: (state, action) => {
            state.user = action.payload;
        },
        storeEmail: (state, action) => {
            state.email = action.payload;
        },
        storeVerifyCode: (state, action) => {
            state.verifyCode = action.payload;
        },
        clearVerifyCode: (state, action) => {
            state.verifyCode = null;
        },
        storeToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const {storeUser, storeEmail, storeVerifyCode, clearVerifyCode, storeToken} = userSlice.actions;
export default userSlice.reducer;

