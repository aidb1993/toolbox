import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
    name: "files",
    initialState: {
        fileData: {
            data: [],
            error: null,
            loading: false
        },
        selection: "all",
        options : []
    },
    reducers: {
        setFileData: (state, action) => {
            state.fileData = action.payload;
        },
        setSelection: (state, action) => {
            state.selection = action.payload;
        },
        setOptions: (state, action) => {
            state.options = action.payload;
        }
    }
});

export const { setFileData, setSelection, setOptions } = filesSlice.actions;
export default filesSlice.reducer;