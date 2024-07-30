// date 간 누가 더 빠른 날짜인지를 나타내는 함수. 1, 2, 3은 각각 더 빠름, 같음, 더 느림을 의미함
export const isEarlierDate = (firstDate: Date, secondDate: Date): number => {
  if (firstDate.getTime() < secondDate.getTime()) {
    return 1;
  } else if (firstDate.getTime() === secondDate.getTime()) {
    return 2;
  } else {
    return 3;
  }
};

export const getDateDiff = (
  firstDate: string | Date,
  secondDate: string | Date
): number => {
  return (
    Math.abs(new Date(firstDate).getTime() - new Date(secondDate).getTime()) /
      (1000 * 60 * 60 * 24) +
    1
  );
};

export const formatDateToYYYYMMDD = (dateString: string): string => {
  // 입력된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 맞추기 위해 padStart를 사용합니다.

  // 원하는 포맷으로 문자열을 생성
  return `${year}.${month}.${day}`;
};
