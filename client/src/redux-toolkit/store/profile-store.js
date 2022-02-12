import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducer/profile-reducer";


export const profileStore = configureStore({
    reducer:{profile:profileReducer},
})