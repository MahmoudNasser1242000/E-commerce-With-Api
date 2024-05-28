import { createSlice } from "@reduxjs/toolkit"

interface InitialState {
    internetMode: boolean
}

let initialState: InitialState = {
    internetMode: false
}
const internetModeSlice = createSlice({
    name: "internet",
    initialState,
    reducers: {
        ChangeMode: (state, action) => {
            state.internetMode = action.payload            
        },
    }
})

export const {ChangeMode} = internetModeSlice.actions;
export default internetModeSlice.reducer;