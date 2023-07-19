import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Station } from "../../types/station";
import { fetchStations as fetchStationsAPI } from "../../services/api";


interface StationsState {
    stations: Station[];
    currentStation: Station | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: StationsState = {
    stations: [],
    currentStation: null,
    status: 'idle',
    error: null,
};

export const fetchStations = createAsyncThunk('stations/fetchStations', async () => {
    const response = await fetchStationsAPI();
    return response;
});

export const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setStations: (state, action: PayloadAction<Station[]>) => {
            state.stations = action.payload;
        },
        setCurrentStation: (state, action: PayloadAction<Station | null> ) => {
            state.currentStation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStations.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchStations.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.stations = action.payload;
        })
        .addCase(fetchStations.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ? action.error.message : null;
        });
    }
});

export const {setStations, setCurrentStation} = stationsSlice.actions;

export const selectStations = (state: RootState) => state.stations.stations;
export const selectCurrentStation = (state: RootState) => state.stations.currentStation;

export default stationsSlice.reducer;
