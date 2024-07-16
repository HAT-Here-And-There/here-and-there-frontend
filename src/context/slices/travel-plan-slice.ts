import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface travelPlanStateProps {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
}

const initialTravelPlanState: travelPlanStateProps = {
  name: null,
  startDate: null,
  endDate: null,
};

const travelPlanSlice = createSlice({
  name: 'travelPlan',
  initialState: initialTravelPlanState,
  reducers: {
    changePlanName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    changeStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    changeEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
  },
});

export const { changePlanName, changeStartDate, changeEndDate } =
  travelPlanSlice.actions;

export default travelPlanSlice.reducer;
