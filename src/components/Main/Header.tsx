import React from 'react';
import MainLogo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white-800 text-black p-2">
      <div className="container mx-auto flex items-center">
        <div className="title">
          <MainLogo/>
        </div>
        <nav>
          <ul className="flex space-x-12">
            <li>
              <a href="/select-place" className="hover:underline font-custom font-color">
                장소목록
              </a>
            </li>
            <li>
              <a href="/travel-plans-list" className="hover:underline font-custom">
                여행계획
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-custom">
                마이페이지
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline font-custom">
                로그인
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
