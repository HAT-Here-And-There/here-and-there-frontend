export default function PlanCreateButton({
  handleIsModalState,
  handlePlanStepState,
}: {
  handleIsModalState: (st: boolean) => void;
  handlePlanStepState: (st: number) => void;
}) {
  return (
    <div className="w-[80%] h-[60px] absolute bottom-0 mb-10 flex justify-end items-center">
      <button
        className="w-[200px] h-[60px] rounded-lg bg-textPurple text-white text-2xl font-main"
        onClick={() => {
          handleIsModalState(true);
          handlePlanStepState(1);
        }}
      >
        계획 생성하기
      </button>
    </div>
  );
}
