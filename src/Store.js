import { configureStore } from "@reduxjs/toolkit";
import MasterSlice from "./components/MasterSlice";
const store = configureStore({
    reducer: {
        master: MasterSlice
    }
});
export default store;