import Header from '@components/all/Header';
import RecommendedPlace from '@components/Main/RecommendedPlace';
import RegionList from '@components/Main/RegionList';
import Footer from '@components/all/Footer';

export default function Main() {
  return (
    <>
      <Header />
      <RecommendedPlace />
      <RegionList />
      <Footer />
    </>
  );
}
