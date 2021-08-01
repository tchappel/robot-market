import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { LoadingStatus } from "types";

export type RobotsFilterOptions = {
  [material: string]: boolean;
};

export type RobotsFilterState = {
  loading: LoadingStatus;
  options: RobotsFilterOptions;
};

const initialState: RobotsFilterState = {
  loading: LoadingStatus.idle,
  options: {},
};

export const robotsFilterSlice = createSlice({
  name: "robotsFilter",
  initialState,
  reducers: {
    createOptions: (state, action: PayloadAction<RobotsFilterOptions>) => {
      state.options = action.payload;
      state.loading = LoadingStatus.succeeded;
    },
    updateOptions: (state, action: PayloadAction<RobotsFilterOptions>) => {
      state.options = { ...state.options, ...action.payload };
    },
  },
});

export const {
  createOptions: createRobotsFilterOptions,
  updateOptions: updateRobotsFilterOptions,
} = robotsFilterSlice.actions;

export const selectRobotsFilter = (state: RootState) => state.robotsFilter;
export const selectRobotsFilterLoading = (state: RootState) =>
  state.robotsFilter.loading;
export const selectRobotsFilterOptions = (state: RootState) =>
  state.robotsFilter.options;

export default robotsFilterSlice.reducer;
