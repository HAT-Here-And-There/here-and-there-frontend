export default function TravelNameInput({
  planName,
  handlePlanName,
  handlePlanStepState,
}: {
  planName: string;
  handlePlanName: (st: string) => void;
  handlePlanStepState: (st: number) => void;
}) {
  return (
    <div className="w-[80%] h-[80%] bg-white rounded-2xl flex flex-col justify-start items-center pt-[50px] gap-y-28">
      <p className="text-3xl font-main">여행 계획서의 이름을 알려주세요!</p>
      <div className="w-[70%] flex items-center gap-x-[30px]">
        <label htmlFor="planName" className="text-3xl font-main">
          이름 :
        </label>
        <input
          type="text"
          placeholder="Enter Your Travel Plan Name"
          className="grow appearance-none border-b-2 border-textPurple focus:outline-none text-2xl pl-1"
          value={planName}
          onChange={(event) => {
            handlePlanName(event.target.value);
          }}
        />
      </div>
      <div
        id="next-step-button"
        className="w-[80%]  flex justify-end items-center"
      >
        <button
          className="w-[200px] h-[60px] rounded-lg text-xl font-main bg-textPurple text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePlanStepState(2)}
          disabled={planName === ''}
        >
          날짜 선택하기
        </button>
      </div>
    </div>
  );
}
