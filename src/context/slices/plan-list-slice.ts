import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { planListAllPlaceItem } from '@_types/type';

interface PlanListState {
  places: planListAllPlaceItem[][];
  selectedPlace: planListAllPlaceItem | null;
}

const initialState: PlanListState = {
  places: [],
  selectedPlace: null,
};

export const planListSlice = createSlice({
  name: 'planList',
  initialState,
  reducers: {
    selectPlace: (state, action: PayloadAction<planListAllPlaceItem>) => {
      state.selectedPlace = action.payload;
    },
    addPlaceToDay: (
      state,
      action: PayloadAction<{
        dayIndex: number;
        placeIndex: number;
        newPlace: planListAllPlaceItem;
      }>
    ) => {
      const { dayIndex, placeIndex, newPlace } = action.payload;

      if (!state.places[dayIndex]) {
        state.places[dayIndex] = [];
      }

      state.places[dayIndex].splice(placeIndex, 0, newPlace);
    },
    setPlaces: (state, action: PayloadAction<planListAllPlaceItem[][]>) => {
      state.places = action.payload;  // 전체 상태를 업데이트하는 새로운 액션
    },
  },
});

export const { selectPlace, addPlaceToDay, setPlaces } = planListSlice.actions;

export default planListSlice.reducer;
