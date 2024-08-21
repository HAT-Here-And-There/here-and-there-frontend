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
  const [currentName, setCurrentName] = useState(name);

  function moveToPlanDetailPage() {
    if (!isEditModalOpen) {
      navigate(`/travel-plan/${id}`);
    }
  }

  function handleEditName() {
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPlanName, // 이름 변경 요청
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('계획서 이름이 성공적으로 수정되었습니다.');
          setCurrentName(newPlanName); // 수정된 이름 상태 업데이트
          setIsEditModalOpen(false);
        } else {
          throw new Error('계획서 이름 수정에 실패했습니다.');
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
        {`${startDateList[0]}년 ${startDateList[1]}월 ${startDateList[2]}일`}~
        {`${endDateList[0]}년 ${endDateList[1]}월 ${endDateList[2]}일`}
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

      {/* 여행 계획서 이름 편집 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="계획서 이름 편집"
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
        <h2 className="text-lg font-bold mb-4">계획서 이름 편집</h2>
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
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
            onClick={handleEditName}
            className="bg-blue-500 text-white p-2 rounded"
          >
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
}
