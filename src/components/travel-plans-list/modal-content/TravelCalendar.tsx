// 캘린더는 시작일, 종료일 상태와 이를 바꾸는 함수를 받고, 백엔드로 보낼 계획명도 전달은 받아야 한다
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

interface travelDates {
  startDate: Date | null;
  endDate: Date | null;
}

export default function TravelCalendar({ planName }: { planName: string }) {
  const [dates, setDates] = useState<travelDates>({
    startDate: null,
    endDate: null,
  });
  console.log(planName);

  const onDateChange = (value: Date) => {
    console.log(typeof value);
    const { startDate, endDate } = dates;

    if (!startDate || (startDate && endDate)) {
      // start가 없거나, 둘다 차있으면 새로 고르는걸 start로, 나머지는 null로
      setDates({ startDate: value, endDate: null });
    } else if (startDate && !endDate) {
      const newEndDate = value;
      const diffInDays =
        (+newEndDate - +new Date(startDate)) / (1000 * 60 * 60 * 24);

      if (diffInDays < 0) {
        alert('종료일은 시작일보다 나중이어야 합니다!');
        return;
      }

      if (diffInDays > 5) {
        alert('시작일과 종료일의 차이는 최대 5일이어야 합니다!');
        return;
      } else {
        setDates({ startDate, endDate: newEndDate });
      }
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const { startDate, endDate } = dates;

    if (view === 'month') {
      if (startDate && date.getTime() === new Date(startDate).getTime()) {
        return 'custom-selected';
      }

      if (endDate && date.getTime() === new Date(endDate).getTime()) {
        return 'custom-selected';
      }

      // 사이에 위치한 날들에 대한 스타일링
      if (
        startDate &&
        endDate &&
        date > new Date(startDate) &&
        date < new Date(endDate)
      ) {
        return 'custom-range';
      }
    }

    return null;
  };

  console.log(dates);

  return (
    <div className="w-[80%] h-[80%] bg-white rounded-2xl flex flex-col justify-start items-center pt-[50px] gap-y-3">
      <p className="text-3xl font-main">여행의 날짜를 알려주세요!</p>
      <Calendar
        className="react-calendar__navigation"
        onClickDay={onDateChange}
        tileClassName={tileClassName}
      />
      <div id="finish-button" className="w-[80%] flex justify-end items-center">
        <button className="w-[150px] h-[45px] rounded-lg text-xl font-main bg-textPurple text-white disabled:cursor-not-allowed disabled:opacity-50">
          완료하기
        </button>
      </div>
    </div>
  );
}
