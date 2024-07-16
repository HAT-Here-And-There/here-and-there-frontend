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
