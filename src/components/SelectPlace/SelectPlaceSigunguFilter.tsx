export default function SelectPlaceSigunguFilter() {
  const cities = [
    '포항',
    '경주',
    '구미',
    '경산',
    '안동',
    '영천',
    '김천',
    '문경',
    '울진',
    '영덕',
    '울릉도',
  ];

  return (
    <div className="flex text-black items-center justify-evenly bg-white-800 h-[85px] min-h-[85px]">
      {cities.map((city) => (
        <div
          key={city}
          className=" hover: cursor-pointer hover:text-chatRoomPurple hover:text-white active:text-white w-24 bg-gray-200 text-center rounded-3xl font-main text-lg"
        >
          {city}
        </div>
      ))}
    </div>
  );
}
