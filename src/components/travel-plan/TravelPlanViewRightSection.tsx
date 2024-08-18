import { dailyPlansProps } from '@pages/TravelPlan';

interface travelPlanViewRightSectionProps {
  dailyPlans: dailyPlansProps[];
}

export default function TravelPlanViewRightSection({
  dailyPlans,
}: travelPlanViewRightSectionProps) {
  console.log(dailyPlans);
  return (
    <div className="w-[65%] h-full travel-plan-scroll-box flex font-main overflow-x-auto">
      {dailyPlans.map((planElement, index) => {
        return (
          <div className="border-[1px] border-black min-w-[500px] flex flex-col items-center gap-y-5">
            <div>Day {planElement.dayNumber}</div>
            {planElement.dailyPlanItems.map((element) => {
              console.log(element);
              return (
                <div className="w-fit flex flex-col items-center gap-y-3">
                  <p className="w-full flex justify-start">
                    {element.place.name}
                  </p>
                  <img
                    src={element.place.imageUrl}
                    alt="This is place image"
                    className="w-[305px] h-[132px] rounded-xl object-cover"
                  />
                  <input type="text" placeholder={element.memo} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
