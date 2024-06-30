import { travelPlanProp } from '@_types/type';

export default function TravelPlanItem({
  name,
  startDate,
  endDate,
}: travelPlanProp) {
  const startDateList = startDate.split('-');
  const endDateList = endDate.split('-');
  return (
    <div className="flex w-[80%] h-[60px] justify-evenly items-center border-0  border-b-2 border-borderLightGray relative">
      <img
        src="/assets/HAT.svg"
        alt="place hat logo"
        width="50px"
        height="45px"
        className="absolute left-0"
      />
      <p id="travel-name" className="w-[30%] text-center">
        {name}
      </p>
      <p id="travel-date" className="w-[40%] text-center">
        {`${startDateList[0]}년 ${startDateList[1]}월 ${startDateList[2]}일`}~
        {`${endDateList[0]}년 ${endDateList[1]}월 ${endDateList[2]}일`}
      </p>

      <p id="travel-extra-work" className="w-[30%] text-center">
        nope
      </p>
    </div>
  );
}
