import {
  dailyPlansProps,
  travelPlanDataProp,
  dailyPlanItemsProps,
} from '@pages/TravelPlan';
import { SetStateAction, Dispatch } from 'react';

interface travelPlanViewRightSectionProps {
  dailyPlans: dailyPlansProps[];
  handleTravelPlanData: Dispatch<SetStateAction<travelPlanDataProp | null>>;
}

const swapTwoElementInArray = (
  arr: Array<dailyPlanItemsProps>,
  firstElementIdx: number,
  secondElementIdx: number
): Array<dailyPlanItemsProps> => {
  if (
    firstElementIdx >= 0 &&
    firstElementIdx < arr.length &&
    secondElementIdx >= 0 &&
    secondElementIdx < arr.length
  ) {
    // 요소들을 스왑
    [arr[firstElementIdx], arr[secondElementIdx]] = [
      arr[secondElementIdx],
      arr[firstElementIdx],
    ];
  } else {
    console.error('인덱스가 배열의 범위를 벗어났습니다.');
  }

  return arr;
};

export default function TravelPlanViewRightSection({
  dailyPlans,
  handleTravelPlanData,
}: travelPlanViewRightSectionProps) {
  const modifyPlanFunction = (
    dayIndex: number,
    placeOrderIndex: number,
    type: 'up' | 'down' | 'delete'
  ): void => {
    handleTravelPlanData((prevData) => {
      const newDailyPlansArray: dailyPlansProps[] = [];
      if (prevData?.dailyPlans) {
        for (let i = 0; i < dailyPlans.length; i++) {
          if (i !== dayIndex) {
            newDailyPlansArray.push(dailyPlans[i]);
          } else {
            if (type === 'up') {
              if (placeOrderIndex === 0) {
                newDailyPlansArray.push(dailyPlans[dayIndex]);
              } else {
                const tmpArray = swapTwoElementInArray(
                  [...prevData.dailyPlans[dayIndex].dailyPlanItems],
                  placeOrderIndex,
                  placeOrderIndex - 1
                );
                newDailyPlansArray.push({
                  date: dailyPlans[dayIndex].date,
                  dayNumber: dailyPlans[dayIndex].dayNumber,
                  id: dailyPlans[dayIndex].id,
                  dailyPlanItems: tmpArray,
                });
              }
            } else if (type === 'down') {
              if (
                placeOrderIndex ===
                dailyPlans[dayIndex].dailyPlanItems.length - 1
              ) {
                newDailyPlansArray.push(dailyPlans[dayIndex]);
              } else {
                const tmpArray = swapTwoElementInArray(
                  [...prevData.dailyPlans[dayIndex].dailyPlanItems],
                  placeOrderIndex,
                  placeOrderIndex + 1
                );
                newDailyPlansArray.push({
                  date: dailyPlans[dayIndex].date,
                  dayNumber: dailyPlans[dayIndex].dayNumber,
                  id: dailyPlans[dayIndex].id,
                  dailyPlanItems: tmpArray,
                });
              }
            } else if (type === 'delete') {
              const tmpDailyPlanItems = dailyPlans[i].dailyPlanItems.filter(
                (element, i) => i !== placeOrderIndex
              );
              newDailyPlansArray.push({
                date: dailyPlans[i].date,
                dayNumber: dailyPlans[i].dayNumber,
                id: dailyPlans[i].id,
                dailyPlanItems: tmpDailyPlanItems,
              });
            }
          }
        }
      }
      return {
        id: prevData?.id as number,
        name: prevData?.name as string,
        startDate: prevData?.startDate as string,
        endDate: prevData?.endDate as string,
        dailyPlans: newDailyPlansArray,
      };
    });
  };

  return (
    <div className="w-[65%] h-full travel-plan-scroll-box flex font-main overflow-x-auto">
      {dailyPlans.map((planElement, idx) => {
        return (
          <div
            className="border-x-[1px] border-y-[5px] rounded-lg overflow-y-scroll border-black min-w-[500px] flex flex-col items-center gap-y-5 pb-10"
            key={idx}
          >
            <div className="w-[65%] mt-[35px] flex justify-start items-center">
              Day {planElement.dayNumber}
            </div>
            {planElement.dailyPlanItems.map((element, index) => {
              return (
                <div
                  className="w-fit h-fit flex flex-col items-center gap-y-3"
                  key={index}
                >
                  <div className="w-full flex justify-between items-center">
                    {element.place.name}
                    <div className="flex w-fit justify-around items-center gap-x-2">
                      <img
                        src="/assets/UP.svg"
                        alt="This is up svg image file"
                        className="hover:cursor-pointer"
                        onClick={() => modifyPlanFunction(idx, index, 'up')}
                      />
                      <img
                        src="/assets/DOWN.svg"
                        alt="This is down svg image file"
                        className="hover:cursor-pointer"
                        onClick={() => modifyPlanFunction(idx, index, 'down')}
                      />
                      <img
                        src="/assets/delete-icon.svg"
                        alt="This is delete svg image file"
                        className="w-6 h-6 hover:cursor-pointer"
                        onClick={() => modifyPlanFunction(idx, index, 'delete')}
                      />
                    </div>
                  </div>
                  <img
                    src={element.place.imageUrl}
                    alt="This is place image"
                    className="w-[305px] h-[132px] rounded-xl object-cover"
                  />
                  <div className="mt-2 flex justify-center">
                    <textarea
                      className="w-[305px] h-[50px] rounded-xl border border-gray-300 p-2"
                      placeholder={element.memo}
                    ></textarea>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
