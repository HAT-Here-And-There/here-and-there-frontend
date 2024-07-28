// 캘린더는 시작일, 종료일 상태와 이를 바꾸는 함수를 받고, 백엔드로 보낼 계획명도 전달은 받아야 한다
import Calendar from 'react-calendar';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calendarInitialState,
  calendarReducerFn,
} from '@context/calendarInitialState';
import { isEarlierDate } from '@utils/date';

export default function TravelCalendar({ planName }: { planName: string }) {
  const navigate = useNavigate();

  const [dateState, dateDispatch] = useReducer(
    calendarReducerFn,
    calendarInitialState
  );

  const onDateClick = (incomingDate: Date) => {
    if (dateState.startDate === null && dateState.endDate === null) {
      dateDispatch({ type: 'noPreviousData', incomingDate });
    } else if (dateState.startDate !== null && dateState.endDate === null) {
      if (isEarlierDate(incomingDate, dateState.startDate) === 1) {
        dateDispatch({
          type: 'isPrevStartDayAndNotAfterEndDay',
          incomingDate,
        });
      } else if (isEarlierDate(incomingDate, dateState.startDate) === 3) {
        dateDispatch({
          type: 'isPrevStartDayAndAfterEndDay',
          incomingDate,
        });
      }
    } else {
      dateDispatch({ type: 'isPrevStartDayAndIsPrevEndDay', incomingDate });
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const { startDate, endDate } = dateState;

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

  function handleClickCompletButton() {
    if (dateState.startDate && dateState.endDate) {
      localStorage.setItem('travelPlanName', planName);
      localStorage.setItem(
        'travelPlanStartDate',
        dateState.startDate.toDateString()
      );
      localStorage.setItem(
        'travelPlanEndDate',
        dateState.endDate.toDateString()
      );
      navigate(`/travel-plan-all`);
    }

    return;
  }

  return (
    <div className="w-[80%] h-[80%] bg-white rounded-2xl flex flex-col justify-start items-center pt-[56px] gap-y-3">
      <p className="text-3xl font-main">여행의 날짜를 알려주세요!</p>
      <Calendar
        className="react-calendar__navigation"
        onClickDay={onDateClick}
        tileClassName={tileClassName}
      />
      <div id="finish-button" className="w-[80%] flex justify-end items-center">
        <button
          className="w-[150px] h-[45px] rounded-lg text-xl font-main bg-textPurple text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleClickCompletButton}
        >
          완료하기
        </button>
      </div>
    </div>
  );
}
