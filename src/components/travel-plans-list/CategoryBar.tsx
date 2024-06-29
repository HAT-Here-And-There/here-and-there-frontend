export default function CategoryBar() {
  return (
    <div
      id="category-bar"
      className="flex w-[80%] h-10 justify-evenly items-center border-0 border-t-2 border-b-2 border-black mb-5"
    >
      <p className="w-[20%] text-center">이름</p>
      <p className="w-[40%] text-center">여행 날짜</p>
      <p className="w-[20%] text-center">지역</p>
      <p className="w-[20%] text-center">추가 작업</p>
    </div>
  );
}
