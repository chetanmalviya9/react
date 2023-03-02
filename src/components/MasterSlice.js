import { createSlice } from "@reduxjs/toolkit";
const masterSlice = createSlice({
    name: 'master',
    initialState: {
        data: [
            { rollNo: 1, name: "satish", branch: "IT", year: 2021 },
            { rollNo: 2, name: "mariyam", branch: "BCA", year: 2022 },
            { rollNo: 3, name: "niraj", branch: "BBA", year: 2021 },
            { rollNo: 4, name: "shubham", branch: "CS", year: 2019 },
            { rollNo: 5, name: "naimat", branch: "IT", year: 2022 },
            { rollNo: 6, name: "chetan", branch: "CS", year: 2020 }
        ]
    },
    reducers: {
        deletedetail: (state, action) => {
            let index = action.payload;
            state.data.splice(index, 1);
        },
        updateDetail: (state, action) => {
            let data = action.payload;
            let index = data.index;
            delete data.index;
            console.log(data);
            state.data.splice(index,1,data);
        },
        addDetail: (state, action) => {
            let data = action.payload;
            state.data.push(data);
        }
    }
});
export const { deletedetail, addDetail,updateDetail } = masterSlice.actions;
export default masterSlice.reducer;