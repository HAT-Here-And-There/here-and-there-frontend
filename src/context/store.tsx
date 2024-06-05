import { configureStore } from '@reduxjs/toolkit';
import selectPlaceReducer from '@context/slices/select-place-slice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    selectPlace: selectPlaceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// 해당 함수들로 useSelector, useDispatcher 훅을 매번 제네릭 선언 없이 사용할 수 있음
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
