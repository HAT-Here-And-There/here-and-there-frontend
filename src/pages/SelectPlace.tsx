import Header from '@components/all/Header';
import Footer from '@components/all/Footer';
import SelectPlaceMainAreaFilter from '@components/SelectPlace/SelectPlaceMainAreaFilter';
import SelectPlaceSigunguFilter from '@components/SelectPlace/SelectPlaceSigunguFilter';
import SelectPlacePlaceList from '@components/SelectPlace/SelectPlacePlaceList';

export default function SelectPlacePage() {
  return (
    <>
      <Header />
      <SelectPlaceMainAreaFilter />
      <SelectPlaceSigunguFilter />
      <SelectPlacePlaceList />
      <Footer />
    </>
  );
}
