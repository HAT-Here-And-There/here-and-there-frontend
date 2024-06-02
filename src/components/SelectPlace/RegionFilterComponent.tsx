export default function RegionFilter() {
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

  return (
    <div className="flex text-gray-400 items-center justify-evenly bg-white-800 h-[85px] min-h-[85px] border-t border-b border-slate-200">
      {regions.map((region) => (
        <div
          key={region}
          className="hover:cursor-pointer hover:text-black active:text-black font-main text-lg font-color"
        >
          {region}
        </div>
      ))}
    </div>
  );
}
