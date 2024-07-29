import { TravelPlanDetailsProps } from '@_types/type';


const TravelPlanDetails: React.FC<TravelPlanDetailsProps> = ({ onBackClick }) => {
  return (
    <div>
      <button onClick={onBackClick}>뒤로가기</button>
      <h1>전체 일정 페이지</h1>
      {/* 전체 일정 보여주기 */}
    </div>
  );
};

export default TravelPlanDetails;
