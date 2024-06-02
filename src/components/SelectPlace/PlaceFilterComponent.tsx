export default function PlaceFilterComponent() {
  const cities = ["포항", "경주", "구미", "경산", "안동", "영천", "김천", "문경", "울진", "영덕", "울릉도"];

  return (
    <div className="bg-white-800 h-[85px]">
      <div className="border-t border-gray-300" />
      <div className="flex text-black py-5 justify-evenly">
        {cities.map((city) => (
          <div
            key={city}
            className="hover:bg-textPurple active:bg-textPurple hover:text-white active:text-white w-24 bg-gray-200 text-center rounded-3xl font-main text-lg"
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  );
}
