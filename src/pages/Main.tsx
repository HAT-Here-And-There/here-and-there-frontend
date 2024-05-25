import Header from '@components/all/Header';
import RecommendedPlace from '@components/Main/RecommendedPlace';
import Footer from '@components/all/Footer';

export default function Main() {
  return (
    <>
      <Header />
      <RecommendedPlace />
      {/* 여기에 다른 컴포넌트들을 추가할 수 있습니다. */}
      <Footer />
    </>
  );
}
