export default function PlanAllButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <button
        className="w-[64px] h-[102px] rounded-l-lg bg-textPurple text-white font-bold font-text flex flex-col items-center justify-center"
        onClick={onClick}
      >
        <span>전체일정</span>
        <span>보러가기</span>
      </button>
    </div>
  );
}
