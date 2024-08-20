import { dailyPlansProps, travelPlanDataProp } from '@pages/TravelPlan';
import { SetStateAction, Dispatch } from 'react';

interface travelPlanViewRightSectionProps {
  dailyPlans: dailyPlansProps[];
  handleTravelPlanData: Dispatch<SetStateAction<travelPlanDataProp | null>>;
}

export default function TravelPlanViewRightSection({
  dailyPlans,
  handleTravelPlanData,
}: travelPlanViewRightSectionProps) {
  const modifyPlanState = (
    dayIndex: number,
    placeOrderIndex: number,
    actionType: 'up' | 'down' | 'delete'
  ): void => {
    handleTravelPlanData((prevData: travelPlanDataProp | null) => {
      return prevData;
    });
  };

  return (
    <div className="w-[65%] h-full travel-plan-scroll-box flex font-main overflow-x-auto">
      {dailyPlans.map((planElement, idx) => {
        return (
          <div
            className="border-x-[1px] border-y-[5px] rounded-lg overflow-y-scroll border-black min-w-[500px] flex flex-col items-center gap-y-5 pb-10"
            key={planElement.id}
            onClick={() => {}}
          >
            <div className="w-[65%] mt-[35px] flex justify-start items-center">
              Day {planElement.dayNumber}
            </div>
            {planElement.dailyPlanItems.map((element) => {
              return (
                <div
                  className="w-fit h-fit flex flex-col items-center gap-y-3"
                  key={element.id}
                >
                  <p className="w-full flex justify-start">
                    {element.place.name}
                  </p>
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
