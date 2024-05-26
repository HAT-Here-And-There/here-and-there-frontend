import Logo from '@components/Main/Logo';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white-800 text-black h-[80px] flex items-center min-h-20">
      <div className="container mx-auto flex items-center">
        <Link to="/">
          <div className="title hover:cursor-pointer min-w-[250px]">
            <Logo />
          </div>
        </Link>
        <nav className="grow flex justify-between items-center">
          <a
            href="/select-place"
            className="hover:underline font-custom font-color"
          >
            장소목록
          </a>

          <a href="/travel-plans-list" className="hover:underline font-custom">
            여행계획
          </a>

          <a href="#" className="hover:underline font-custom">
            마이페이지
          </a>

          <a href="/login" className="hover:underline font-custom">
            로그인
          </a>
        </nav>
      </div>
    </header>
  );
}
