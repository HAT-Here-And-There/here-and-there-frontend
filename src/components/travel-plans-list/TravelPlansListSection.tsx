import { useState, useEffect } from 'react';
import { travelPlanProp } from '@_types/type';
import CategoryBar from './CategoryBar';
import TravelPlanItem from './TravelPlanItem';
import PlanCreateButton from './PlanCreateButton';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import TravelNameInput from './modal-content/TravelNameInput';
import TravelCalendar from './modal-content/TravelCalendar';

export default function TravelPlansListSection() {
  const [travelPlanList, setTravelPlanList] = useState<travelPlanProp[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [planStepState, setPlanStepState] = useState<number>(0); // 0 일때 아직 생성 이전, 1일때 제목, 2일때 날짜
  const [planName, setPlanName] = useState<string>('');

  useEffect(() => {
    async function getTravelPlanList() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/plan`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTravelPlanList(data);
      } else {
        throw new Error('fetching travel plan list is failed!');
      }
    }

    try {
      getTravelPlanList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    },
    content: {
      width: '70%',
      height: '70%',
      zIndex: '150',
      padding: '0',
      border: 'none',
      top: '15%', // 너비와 높이를 고려하여 중앙에 오게 (100 - 30) / 2를 한 것
      left: '15%',
      right: '15%',
      bottom: '15%',
      borderRadius: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#5551FF',
    },
  };

  function handleCloseModal() {
    setIsModalOpen(false);
    setPlanStepState(0);
    setPlanName('');
  }

  return (
    <main className="h-travelListSection flex flex-col items-center mt-20 relative">
      <p className="w-[80%] text-2xl font-main mb-[20px]">
        여행 계획서 둘러보기
      </p>
      <CategoryBar />
      {travelPlanList.map((travelplan) => {
        return (
          <TravelPlanItem
            key={travelplan.id}
            id={travelplan.id}
            name={travelplan.name}
            startDate={travelplan.startDate}
            endDate={travelplan.endDate}
          />
        );
      })}
      <PlanCreateButton
        handleIsModalState={setIsModalOpen}
        handlePlanStepState={setPlanStepState}
      />
      <Modal
        isOpen={isModalOpen}
        style={customModalStyles}
        onRequestClose={() => handleCloseModal()}
      >
        <img
          src="/assets/close.svg"
          alt="This is closing UI image"
          className="absolute top-5 right-5 hover:cursor-pointer"
          onClick={() => handleCloseModal()}
        />
        {planStepState === 1 && (
          <TravelNameInput
            planName={planName}
            handlePlanName={setPlanName}
            handlePlanStepState={setPlanStepState}
          />
        )}
        {planStepState === 2 && <TravelCalendar planName={planName} />}
      </Modal>
    </main>
  );
}
