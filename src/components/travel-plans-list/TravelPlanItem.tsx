import { useState } from 'react';
import { travelPlanProp } from '@_types/type';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export default function TravelPlanItem({
  id,
  name,
  startDate,
  endDate,
}: travelPlanProp) {
  const startDateList = startDate.split('-');
  const endDateList = endDate.split('-');
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState(name);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [currentName, setCurrentName] = useState(name);
  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);

  function moveToPlanDetailPage() {
    if (!isEditModalOpen) {
      navigate(`/travel-plan/${id}`);
    }
  }

  function handleEditPlan() {
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPlanName,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('계획서가 성공적으로 수정되었습니다.');
          setCurrentName(newPlanName); // 수정된 이름 상태 업데이트
          setCurrentStartDate(newStartDate); // 수정된 시작일 상태 업데이트
          setCurrentEndDate(newEndDate); // 수정된 종료일 상태 업데이트
          setIsEditModalOpen(false);
        } else {
          throw new Error('계획서 수정에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleModalClose(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation(); // 편집 버튼 클릭 시 이벤트가 부모로 전파되지 않도록 이벤트 전파 차단함
    setIsEditModalOpen(false);
  }

  return (
    <div
      className="flex w-[80%] h-[60px] justify-evenly items-center border-0 border-b-2 border-borderLightGray relative hover:cursor-pointer"
      onClick={moveToPlanDetailPage}
    >
      <img
        src="/assets/HAT.svg"
        alt="place hat logo"
        width="50px"
        height="45px"
        className="absolute left-0"
      />
      <p id="travel-name" className="w-[30%] text-center">
        {currentName} {/* 수정된 여행 계획서 이름 표시 */}
      </p>
      <p id="travel-date" className="w-[40%] text-center">
        {`${currentStartDate.split('-')[0]}년 ${
          currentStartDate.split('-')[1]
        }월 ${currentStartDate.split('-')[2]}일`}
        ~
        {`${currentEndDate.split('-')[0]}년 ${currentEndDate.split('-')[1]}월 ${
          currentEndDate.split('-')[2]
        }일`}
      </p>
      <p id="travel-extra-work" className="w-[30%] text-center">
        <img
          src="/assets/Edit-icon.svg"
          alt="편집"
          className="w-6 h-6 inline-block cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditModalOpen(true);
          }}
        />
      </p>

      {/* 여행 계획서 이름 및 날짜 편집 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="계획서 편집"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
          },
        }}
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="text-lg font-bold mb-4">계획서 편집</h2>
        <label className="block mb-2">계획서 이름</label>
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2">출발 날짜</label>
        <input
          type="date"
          value={newStartDate}
          onChange={(e) => setNewStartDate(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2">도착 날짜</label>
        <input
          type="date"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={handleModalClose}
            className="mr-4 bg-gray-500 text-white p-2 rounded"
          >
            취소
          </button>
          <button
            onClick={handleEditPlan}
            className="bg-textPurple text-white p-2 rounded"
          >
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
}
