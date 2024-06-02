import { createSlice } from "@reduxjs/toolkit"

interface InitialState {
    profileId: number | null
}

let initialState: InitialState = {
    profileId: null
}
const profileImageSlice = createSlice({
    name: "profileImage",
    initialState,
    reducers: {
        getImageId: (state, action) => {
            state.profileId = action.payload            
        },
    }
})

export const {getImageId} = profileImageSlice.actions;
export default profileImageSlice.reducer;