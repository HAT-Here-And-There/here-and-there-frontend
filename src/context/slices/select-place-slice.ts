// select-place url에서 필요한 권역, 도시에 관한 전역 상태 슬라이스 생성
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectedPlaceFilterProps, sigunguProps } from '@_types/type';

export const initialSelectPlaceState: selectedPlaceFilterProps = {
  selectedMainArea: null,
  selectedSigungu: null,
};

const selectPlaceSlice = createSlice({
  name: 'selectPlace',
  initialState: initialSelectPlaceState,
  reducers: {
    changeMainArea: (state, action: PayloadAction<number | null>) => {
      state.selectedMainArea = action.payload; // 해당 action creator를 끌어다 쓸 때에는 인자가 바로 문자열이면 됨
    },

    changeSigungu: (state, action: PayloadAction<sigunguProps | null>) => {
      state.selectedSigungu = action.payload;
    },
  },
});

export const { changeMainArea, changeSigungu } = selectPlaceSlice.actions;
export default selectPlaceSlice.reducer;
