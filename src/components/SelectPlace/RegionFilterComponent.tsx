export default function RegionFilter() {
  const regions = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

  return (
    <div className="bg-white-800 h-[85px]">
      <div className="border-t border-gray-300" />
      <div className="flex text-gray-400 py-5 justify-evenly">
        {regions.map((region) => (
          <div
            key={region}
            className="hover:underline hover:text-black active:text-black font-main text-lg font-color"
          >
            {region}
          </div>
        ))}
      </div>
    </div>
  );
}
