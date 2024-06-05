import Header from '@components/all/Header';
import MainRecommendedPlaceList from '@components/Main/MainRecommendedPlaceList';
import MainEightRegionList from '@components/Main/MainEightRegionList';
import Footer from '@components/all/Footer';

export default function Main() {
  return (
    <>
      <Header />
      <MainRecommendedPlaceList />
      <MainEightRegionList />
      <Footer />
    </>
  );
}
