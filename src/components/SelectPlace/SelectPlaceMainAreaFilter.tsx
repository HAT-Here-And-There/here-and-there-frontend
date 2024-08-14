import { useAppDispatch, useAppSelector } from '@context/store';
import {
  changeMainArea,
  changeSigungu,
} from '@context/slices/select-place-slice';

export default function SelectPlaceMainAreaFilter() {
  const dispatch = useAppDispatch();
  const selectedMainArea = useAppSelector(
    (state) => state.selectPlace.selectedMainArea
  );

  console.log(selectedMainArea);
  const regions = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충청',
    '전라',
    '경상',
    '제주',
  ];

  function handleClickMainArea(idx: number) {
    dispatch(changeMainArea(idx + 1));
    dispatch(changeSigungu(null));
  }

  return (
    <div className="flex text-gray-400 items-center justify-evenly bg-white-800 h-[85px] min-h-[85px] border-t border-b border-slate-200">
      {regions.map((region, index) => (
        <div
          key={region}
          className={`hover:cursor-pointer hover:text-black active:text-black font-main text-lg font-color ${
            index + 1 === selectedMainArea ? 'text-black' : null
          }`}
          onClick={() => handleClickMainArea(index)}
        >
          {region}
        </div>
      ))}
    </div>
  );
}
