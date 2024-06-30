// 캘린더는 시작일, 종료일 상태와 이를 바꾸는 함수를 받고, 백엔드로 보낼 계획명도 전달은 받아야 한다
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TravelCalendar({
  planName,
  startDate,
  handleStartDate,
  endDate,
  handleEndDate,
}: {
  planName: string;
  startDate: string;
  handleStartDate: (st: string) => void;
  endDate: string;
  handleEndDate: (st: string) => void;
}) {
  console.log(planName);
  console.log(startDate);
  console.log(handleStartDate);
  console.log(endDate);
  console.log(handleEndDate);
  return (
    <div className="w-[80%] h-[80%] bg-white rounded-2xl flex flex-col justify-start items-center pt-[50px] gap-y-3">
      <p className="text-3xl font-main">여행의 날짜를 알려주세요!</p>
      <Calendar className="react-calendar" />
      <div id="finish-button" className="w-[80%] flex justify-end items-center">
        <button className="w-[150px] h-[45px] rounded-lg text-xl font-main bg-textPurple text-white disabled:cursor-not-allowed disabled:opacity-50">
          완료하기
        </button>
      </div>
    </div>
  );
}
