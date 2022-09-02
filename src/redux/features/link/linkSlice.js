import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import services from "../../../services"

const initialState = {
    linksList: [],
    EM: "",
    EC: 1,
    isLoading: false,
    isError: false,
    isSuccess: false,
}

export const getLink = createAsyncThunk("link/getLink", async () => {
    const response = await services.getLinkReq()
    return response
})

export const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false

            return state
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getLink.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getLink.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload && action.payload.EC === 0) {
                    state.isError = false
                    state.linksList = [...action.payload.DT]
                    state.isSuccess = true
                    state.isError = false
                } else {
                    state.isSuccess = false
                    state.isError = true
                }
            })
            .addCase(getLink.rejected, (state, action) => {
                // Add user to the state array
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
            })
    },
})

// Action creators are generated for each case reducer function
export const { clearState } = linkSlice.actions

export default linkSlice.reducer
