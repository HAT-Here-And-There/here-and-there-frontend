export default function PlanCreateButton({
    handlePlanStepState,
  }: {
    handlePlanStepState: (st: number) => void;
  }) {
    return (
      <div className="w-[80%] h-[60px] absolute bottom-0 mb-10 flex justify-end items-center">
        <button
          className="w-[200px] h-[60px] rounded-lg bg-textPurple text-white text-2xl font-main"
          onClick={() => {
            handlePlanStepState(1);
          }}
        >
          전체 일정 보러가기
        </button>
      </div>
    );
  }