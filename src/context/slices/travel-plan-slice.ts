import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { travelDates } from '@_types/type';

const initialTravelPlanState: travelDates & { name: string | null } = {
  name: null,
  startDate: null,
  endDate: null,
};

const travelPlanSlice = createSlice({
  name: 'traelPlan',
  initialState: initialTravelPlanState,
  reducers: {
    changePlanName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    changeStartDate: (state, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload;
    },
    changeEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
  },
});

export const { changePlanName, changeStartDate, changeEndDate } =
  travelPlanSlice.actions;

export default travelPlanSlice.reducer;
