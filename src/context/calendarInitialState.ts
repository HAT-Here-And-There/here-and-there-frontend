import { travelDates } from '@_types/type';

export const calendarInitialState: travelDates = {
  startDate: null,
  endDate: null,
};

interface actionType {
  type:
    | 'noPreviousData'
    | 'isPrevStartDayAndAfterEndDay'
    | 'isPrevStartDayAndNotAfterEndDay'
    | 'isPrevStartDayAndIsPrevEndDay'
    | 'isPrevStartDayAndIsPrevEndDay';
  incomingDate: Date;
}

// 날짜의 로직을 계산할 리듀서 함수에 해당함
export function calendarReducerFn(
  state: travelDates,
  action: actionType
): travelDates {
  if (action.type === 'noPreviousData') {
    return {
      startDate: action.incomingDate,
      endDate: null,
    };
  }
  if (action.type === 'isPrevStartDayAndAfterEndDay') {
    return {
      startDate: state?.startDate,
      endDate: action.incomingDate,
    };
  }

  if (action.type === 'isPrevStartDayAndNotAfterEndDay') {
    return {
      startDate: action.incomingDate,
      endDate: null,
    };
  }

  if (action.type === 'isPrevStartDayAndIsPrevEndDay') {
    return {
      startDate: action.incomingDate,
      endDate: null,
    };
  }

  return { startDate: null, endDate: null };
}
