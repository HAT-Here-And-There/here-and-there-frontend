// select-place url에서 필요한 권역, 도시에 관한 전역 상태 슬라이스 생성
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectPlaceProps } from '@_types/type';

export const initialSelectPlaceState: selectPlaceProps = {
  selectedRegion: null,
  selectedCity: null,
};

const selectPlaceSlice = createSlice({
  name: 'selectPlace',
  initialState: initialSelectPlaceState,
  reducers: {
    changeRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload; // 해당 action creator를 끌어다 쓸 때에는 인자가 바로 문자열이면 됨
    },

    changeCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { changeRegion, changeCity } = selectPlaceSlice.actions;
export default selectPlaceSlice.reducer;
