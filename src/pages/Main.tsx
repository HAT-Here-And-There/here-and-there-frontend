import React from 'react';
import Header from '../components/Main/Header';
import Places from '../components/Main/Place';


const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <Places />
      {/* 여기에 다른 컴포넌트들을 추가할 수 있습니다. */}
    </div>
  );
};

export default Main;
