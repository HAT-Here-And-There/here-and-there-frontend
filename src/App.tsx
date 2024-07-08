import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '@pages/Main';
import LoginPage from '@pages/Login';
import SelectPlacePage from '@pages/SelectPlace';
import ChatRoomPage from '@pages/ChatRoom';
import SignUpPage from '@pages/SignUp';
import TravelPlanPage from '@pages/TravelPlan';
import TravelPlansListPage from '@pages/TravelPlansList';
import TravelPlanList from '@pages/TravelPlanAll';
import Modal from 'react-modal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/select-place" element={<SelectPlacePage />} />
        <Route path="/travel-plans-list" element={<TravelPlansListPage />} />
        <Route path="/travel-plan-all" element={<TravelPlanList />} />
        <Route path="/chatroom">
          <Route path=":placeId" element={<ChatRoomPage />} />
        </Route>
        <Route path="/travel-plan">
          <Route path=":travelPlanName" element={<TravelPlanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

Modal.setAppElement('#root');

export default App;